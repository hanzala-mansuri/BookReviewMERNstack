import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://bookreview-57qn.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Error in fetching book details, please try again later...");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://bookreview-57qn.onrender.com/api/v1/get-comments/${id}`
        );
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Error in fetching comments, please try again later...");
      }
    };

    fetchBookDetails();
    fetchComments();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    if (!isLoggedIn) {
      toast.info("Please Login to add to favourites.");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.put(
        "https://bookreview-57qn.onrender.com/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding book to favourites:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleCart = async () => {
    if (!isLoggedIn) {
      toast.info("Please Login to add to cart.");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.put(
        "https://bookreview-57qn.onrender.com/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred, please try again later...");
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        "https://bookreview-57qn.onrender.com/api/v1/delete-book",
        { headers }
      );
      toast.success(response.data.message);
      navigate("/all-books");
    } catch (error) {
      console.log(error);
      toast.error("Error in Deleting Book, please try again later...");
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        "https://bookreview-57qn.onrender.com/api/v1/add-comment-rating",
        {
          bookid: id,
          comment: newComment,
          rating: newRating,
        },
        { headers }
      );
      toast.success(response.data.message);
      setComments(response.data.data);
      setNewComment("");
      setNewRating(0);
    } catch (error) {
      console.log(error);
      toast.error("Error in comment, please try again later...");
    }
  };

  return (
    <>
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {Data && (
        <div className="px-4 sm:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-4 lg:p-12">
              <img
                src={Data.url}
                alt="book_img"
                className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded w-full lg:w-[60vh]"
              />
              <div className="flex flex-col mt-4 lg:mt-8 gap-4">
                {role !== "admin" && (
                  <>
                    <button
                      onClick={handleFavourite}
                      className="bg-white rounded-full flex items-center gap-2 p-2 text-red-500 justify-center"
                    >
                      <FaHeart className="text-3xl" />
                      <span className="text-bold text-zinc-700">
                        Favourites
                      </span>
                    </button>
                    <button
                      onClick={handleCart}
                      className="bg-white rounded-full flex items-center gap-2 p-2 text-blue-500 lg:justify-start sm:justify-center justify-center"
                    >
                      <FaShoppingCart className="text-3xl" />
                      <span className="text-bold text-zinc-700 mx-5">Cart</span>
                    </button>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <Link
                      to={`/update-book/${id}`}
                      className="bg-white rounded-full flex items-center gap-2 p-2 text-black-500 justify-center"
                    >
                      <FaEdit className="text-3xl" />
                      <span className="text-base text-zinc-700">Edit</span>
                    </Link>
                    <button
                      onClick={deleteBook}
                      className="bg-white rounded-full flex items-center gap-2 p-2 text-red-500 justify-center"
                    >
                      <MdOutlineDelete className="text-3xl" />
                      <span className="text-base text-zinc-700">Delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-3xl sm:text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-lg sm:text-xl">{Data.desc}</p>
            <p className="text-zinc-400 mt-4 flex items-center justify-start">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="text-zinc-100 text-3xl font-semibold mt-4">
              Price: &#8377; {Data.price}
            </p>

            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-2xl text-zinc-300 font-semibold">Comments</h2>
              {comments.length === 0 ? (
                <p className="text-zinc-500 mt-2">No comments yet.</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className="mt-4">
                    <div className="bg-zinc-800 p-4 rounded-md">
                      <p className="text-zinc-300 font-semibold">
                        Username : {comment.user.username}
                      </p>
                      <p className="text-zinc-400 mt-2">
                        Comment : {comment.comment}
                      </p>
                      <p className="text-zinc-400 mt-1">
                        Rating:{" "}
                        <span
                          className={
                            comment.rating === 3
                              ? "text-yellow-500"
                              : comment.rating >= 4
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {comment.rating}/5
                        </span>
                      </p>

                      <p className="text-zinc-500 mt-1 text-sm">
                        Date :{" "}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {/* Add Comment and Rating Form */}
              <div className="mt-8">
                <h3 className="text-xl text-zinc-300 font-semibold">
                  Add a Comment and Rating
                </h3>
                <textarea
                  className="w-full p-2 mt-4 bg-zinc-700 text-zinc-300 rounded-md"
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onFocus={() => {
                    if (!isLoggedIn) {
                      toast.info("Please login to leave a Comment.");
                    }
                  }}
                  // disabled={!isLoggedIn} // Disables input for non-logged-in users
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full p-2 mt-4 bg-zinc-700 text-zinc-300 rounded-md"
                  placeholder="Rate from 1 to 5"
                  value={newRating || ""}
                  onChange={(e) => setNewRating(e.target.value)}
                  onFocus={() => {
                    if (!isLoggedIn) {
                      toast.info("Please login to leave a Rating.");
                    }
                  }}
                  // disabled={!isLoggedIn} // Disables input for non-logged-in users
                />
                <button
                  onClick={handleCommentSubmit}
                  className={`${
                    isLoggedIn
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                  } bg-blue-500 text-white px-4 py-2 mt-4 rounded-md`}
                  disabled={!isLoggedIn} // Prevents clicking the button if not logged in
                >
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
