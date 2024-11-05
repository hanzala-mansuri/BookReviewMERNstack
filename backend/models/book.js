const mongoose = require("mongoose");

const comments = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const book = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    comments: [comments], // Add comments field here
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", book);


// const mongoose = require("mongoose")

// const book = new mongoose.Schema(
// {
//     url:{
//         type:String,
//         required:true,
//     },
//     title:{
//         type:String,
//         required:true,
//     },
//     author:{
//         type:String,
//         required:true,
//     },
//     price:{
//         type:String,
//         required:true,
//     },
//     desc:{
//         type:String,
//         required:true,
//     },
//     language:{
//         type:String,
//         required:true,
//     },
// },
// {timestamps:true}
// );

// module.exports = mongoose.model("books",book)