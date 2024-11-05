const router = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add Comment and Rating
router.post("/add-comment-rating", async (req, res) => {
    try {
        const { bookid, comment, rating } = req.body;
        const { id } = req.headers; // User's ID from the token

        // Find the book and user
        const book = await Book.findById(bookid);
        const user = await User.findById(id);

        if (!book || !user) {
            return res.status(404).json({ message: "Book or User not found" });
        }

        // Create the comment object
        const newComment = {
            user: user._id,
            comment,
            rating,
            createdAt: new Date(),
        };

        // Add the comment to the book's comments
        book.comments.push(newComment);
        await book.save();

        return res.status(200).json({
            message: "Comment and rating added successfully",
            data: book.comments,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Get Comments and Ratings for a Book
router.get("/get-comments/:bookid", async (req, res) => {
    try {
        const { bookid } = req.params;
        const book = await Book.findById(bookid).populate("comments.user", "username");
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            status: "Success",
            data: book.comments,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred in fetching book" });
    }
});

module.exports = router;
