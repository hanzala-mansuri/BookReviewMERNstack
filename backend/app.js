const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config()
require("./conn/connection")

const User = require("./routes/user")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")
const CommentRatings = require("./routes/comments-ratings")

app.use(cors())
app.use(express.json())

//routes
app.use("/api/v1",User)
app.use("/api/v1",Books)
app.use("/api/v1",Favourite)
app.use("/api/v1",Cart)
app.use("/api/v1",Order)
app.use("/api/v1",CommentRatings)



// app.get("/",(req,res) => {
//     res.send("Hello from backend side");
//})

//Creating Port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});