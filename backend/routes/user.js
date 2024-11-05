const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./userAuth")

//sign-up (api)
router.post("/sign-up", async (req,res) => {
    try{
        const { username, email, password, address } = req.body;

        // check username length is greater than 3
        if(username.length < 4){
            return res
            .status(400)
            .json({message:"Username length should be greater than 3"})
        }

        //check username already exists ?
        const existingUsername = await User.findOne({username : username})
        if(existingUsername){
            return res
            .status(400)
            .json({message: "Username already exists"})
        }

        //check email already exists ?
        const existingEmail = await User.findOne({email : email})
        if(existingEmail){
            return res
            .status(400)
            .json({message: "Email already exists"})
        }

        //  username length should greater than 5 // it should greater than 5
        if(password.length < 6){
            return res
            .status(400)
            .json({message:"Password length should be greater than or equals to 6"})
        }

        const hashPass = await bcrypt.hash(password,10)

        const newUser = new User({
            username : username,
            email : email,
            password : hashPass,
            address : address
        })

        await newUser.save();
        
        return res.status(200).json({message: "Sign-up Successfully   "})
    }
    catch(error)
    {
        res
        .status(500)
        .json({message: "Internal server error"})
    }
})

//sign-in (api)
router.post("/sign-in", async (req,res) => {
    try{
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username })
        if(!existingUser)
        {
            res.status(400).json({ message : "Invalid Credentials"})
        }

        await bcrypt.compare(password,existingUser.password, (err,data) => {
            if(data)
            {
                const authClaims = [
                    {name: existingUser.username},
                    {role : existingUser.role},
                ]
                const token = jwt.sign({ authClaims} , "bookstore123" , {
                    expiresIn: "30d",
                })

                res.status(200).json({ id: existingUser._id, role:existingUser.role, token: token})
                // console.log("User logged in successfully: ");
            }
            else{
                res.status(400).json({ message : "Invalid Credentials"})
            }
        })
    }
    catch(error)
    {
        res
        .status(500)
        .json({message: "Internal server error"})
    }
})

// get-user-information (api)
router.get("/get-user-information" , authenticateToken, async (req,res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password')
        
        return res.status(200).json(data)
    } 
    catch (error) {
        res
        .status(500)
        .json({message: "Internal server error"})
    }
})

// Get all users including password (admin endpoint) ---> for admin(manage users)
router.get("/get-all-users", authenticateToken, async (req, res) => {
    try {
        // Fetch all users from the database, including their password
        const users = await User.find(); // You don't need to exclude password here
        
        return res.status(200).json(users); // Return all users
    } 
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update user data including password ---> for admin(manage users)
router.put('/update-user/:id', authenticateToken, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the username and email
    if (username) user.username = username;
    if (email) user.email = email;

    // If password is being updated, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user information
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user by ID ---> for admin(manage users)
router.delete('/delete-user/:id', authenticateToken, async (req, res) => {
  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Successfully deleted user
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//update-address (api)
router.put("/update-address" , authenticateToken , async (req,res) => {
    try {
        const { id } = req.headers
        const { address } = req.body
        await User.findByIdAndUpdate(id,{ address : address })

        return res.status(200).json({ message : " Address Updated Successfully "})
    } catch (error) {
        res.status(500).json({ message : "Internal Server Error"})
    }
})
module.exports = router;