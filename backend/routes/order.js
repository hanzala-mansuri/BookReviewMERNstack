const router = require("express").Router();
const User = require("../models/user")
const Book = require("../models/book")
const Order = require("../models/order")
const { authenticateToken } = require("./userAuth")

//place-order
router.post("/place-order" , authenticateToken , async(req,res) => {
    try {
        const { id } = req.headers
        const { order } = req.body

        for(const orderData of order)
        {
            const newOrder = new Order( { user : id, book : orderData._id })
            const orderDataFromDb = await newOrder.save();
            //saving data in user model
            await User.findByIdAndUpdate(id, { 
                $push: { orders: orderDataFromDb._id }
            })

            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            })
        }
        return res.json({
                status : "Success",
                message : "Order placed successfully", 
            })
        
    } catch (error) {
        console.log(error)
        return res.json({
            status:"Not Found",
            message:"Order not placed due to Internal Server Error"
        })
    }
})


//get-order-history (get order history of particular user)
router.get("/get-order-history" , authenticateToken , async (req,res) => {
    
    try {
        const { id } = req.headers
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        })

        const orderData = userData.orders.reverse()
        return res.json({
            status : "Success",
            data : orderData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json( { message : "An error occured in get-order-history"})        
    }
})

//get-all-orders ---> (admin)
router.get("/get-all-orders", authenticateToken , async (req,res) => {
    try {
        const userData = await Order.find().populate({
            path:"book"
        })
        .populate({
            path:"user",
        })
        .sort({ createdAt : -1 })

        return res.json({
            status : "Success",
            data : userData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json( { message : "An error occured in get-order-history"})        
    }
})


// update-status (api) ---> admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("Updating order ID:", id);
        
        // Find the order by ID
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Get the user from the authenticated request
        const user = await User.findOne({ name: req.user.name });
        // const user = await User.findById(req.user.role);
        if (!user) {
            console.log("User not found for ID:", req.user.role);
            return res.status(403).json({ message: "User not found for ID" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
        

        // Update the order status
        order.status = req.body.status;
        await order.save();

        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

//delete order (api) ----> admin
// router.delete("/delete-order/:id", authenticateToken, async (req, res) => {
//     try {
//         // Check if the user has the 'admin' role
//         if (user.role !== "admin") {
//             return res.status(403).json({ message: "You are not authorized to perform this action" });
//         }

//         const { id } = req.params;

//         // Find and delete the order by ID
//         const order = await Order.findByIdAndDelete(id);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         return res.json({
//             status: "Success",
//             message: "Order Deleted Successfully",
//         });
//     } catch (error) {
//         console.error("Error in Deleting order:", error);
//         return res.status(500).json({ message: "An error occurred", error: error.message });
//     }
// });


module.exports = router
