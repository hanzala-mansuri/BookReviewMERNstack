import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const BookCard = ({ data, favourite }) => {

  const navigate = useNavigate()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "https://bookreview-57qn.onrender.com/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      // alert(response.data.message);
      toast.success(response.data.message);
      navigate("/all-books")
    } catch (error) {
      console.error("Error remove book from favourites:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col w-full sm:w-72 md:w-80 lg:w-96 mx-auto">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="flex justify-center bg-zinc-900 rounded overflow-hidden">
          <img
            src={data.url}
            alt="book-img"
            className="h-[20vh] w-[40vh] sm:h-[25vh] md:h-[30vh] lg:h-[35vh] transition-transform duration-300 transform hover:scale-105"
          />
        </div>
        <h2 className="mt-4 text-lg sm:text-xl md:text-2xl text-zinc-100 font-semibold truncate">
          {data.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 font-semibold truncate">
          by {data.author}
        </p>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl text-zinc-200 font-semibold">
          &#8377; {data.price}
        </p>
      </Link>
      {favourite && (
        <button
          onClick={handleRemoveBook}
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-zinc-900 mt-4 hover:bg-yellow-100 transition-all duration-200"
          // className="bg-zinc-100 hover:bg-zinc-800 text-yellow-900 text-lg lg:text-xl px-4 py-2 mt-4 font-semibold border border-yellow-100 rounded transition duration-300 ease-in-out"
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
