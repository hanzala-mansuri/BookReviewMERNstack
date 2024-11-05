const router = require("express").Router();
const User = require("../models/user")
const { authenticateToken } = require("./userAuth")

//add-to-cart (book)
router.put("/add-to-cart", authenticateToken , async (req,res) => {
    try {
        const { bookid , id } = req.headers
        const userData = await User.findById(id)
        
        const isBookAlreadyInCart = userData.cart.includes(bookid)
        if(isBookAlreadyInCart){
            return res.status(200).json({ message : "Book is already in cart"})
        }

        await User.findByIdAndUpdate(id, { $push : { cart : bookid }  } )
        return res.status(200).json({ message : "Book added to Cart"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message : "An error occured"})
    }
})

//remove-from-cart (book)
router.put("/remove-from-cart/:bookid", authenticateToken, async (req,res) => {
    try{
        const { bookid } = req.params // req.headers is also correct
        const { id } = req.headers
        
        await User.findByIdAndUpdate(id , { $pull : { cart: bookid}})
        
        return res.status(200).json({ message : "Book removed from Cart"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message : "An error occured"})
    }
})

//get-user-cart  --> (get cart of particular user)
router.get("/get-user-cart" , authenticateToken, async(req,res) => {
    try{
        const { id } = req.headers
        const userData = await User.findById(id).populate("cart")
        const userCart = userData.cart.reverse();
        return res.json({
            status : "Success",
            data : userCart
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message : "An error occured in get cart of particular user"})
    }
})

module.exports = router