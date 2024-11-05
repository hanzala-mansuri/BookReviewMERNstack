const router = require("express").Router();
const User = require("../models/user")
const { authenticateToken } = require("./userAuth")

// add-book-to-favourite
router.put("/add-book-to-favourite", authenticateToken, async (req,res) => {
    try{
        const { bookid , id } = req.headers
        const userData = await User.findById(id)
        
        const isBookAlreadyInFavourite = userData.favourites.includes(bookid)
        if(isBookAlreadyInFavourite){
            return res.status(200).json({ message : "Book is already in favourites"})
        }

        await User.findByIdAndUpdate(id, { $push : { favourites : bookid }  } )
        return res.status(200).json({ message : "Book added to favourites"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message : "An error occured"})
    }
})

//remove-book-from-favourite
router.put("/remove-book-from-favourite", authenticateToken, async (req,res) => {
    try{
        const { bookid , id } = req.headers
        const userData = await User.findById(id)
        
        const isBookFavourite = userData.favourites.includes(bookid)
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, { $pull : { favourites : bookid }  } )
        }
        
        return res.status(200).json({ message : "Book removed from favourites"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message : "An error occured"})
    }
})

//get-favourite-book-particular-user
router.get("/get-favourite-book-particular-user" , authenticateToken, async(req,res) => {
    try{
        const { id } = req.headers
        const userData = await User.findById(id).populate("favourites")
        const favouriteBooks = userData.favourites
        return res.json({
            status : "Success",
            data : favouriteBooks
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message : "An error occured in get-favourite-book-particular-user"})
    }
})

module.exports = router;