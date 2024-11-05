import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader"; // Assuming you have a Loader component for loading state
import { toast } from "react-toastify";


const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-57qn.onrender.com/api/v1/get-favourite-book-particular-user",
          { headers }
        );
        setFavouriteBooks(response.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch favorite books. Please try again later.");
        setError("Failed to fetch favorite books. Please try again later.");
        console.error("Error fetching favorite books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Show loader until data is fetched */}
      {/* {loading && ( // Change this line to check loading state
        <div className="flex items-center justify-center h-full ">
          <Loader />
        </div>
      )} */}

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-center text-xl my-4">{error}</div>
      )}

      {/* No Favorite Books Message */}
      {!loading && !error && favouriteBooks.length === 0 && (
        <div className="sm:text-5xl text-3xl font-semibold text-zinc-500 flex flex-col items-center justify-center w-full h-[80vh]">
          No Favourite Books
          <img
            src="./no_favourite.png"
            alt="star"
            className="h-[40vh] w-[40] my-8"
          />
        </div>
      )}

      {/* Display Favourite Books */}
      {!loading && !error && favouriteBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favouriteBooks.map((item, i) => (
            <div key={i} className="flex justify-center">
              <BookCard data={item} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="container mx-auto p-4">
  //     {/* Show loader until data is fetched */}
  //     {!Favourites && (
  //       <div className="flex items-center justify-center h-[80vh]">
  //         <Loader />
  //       </div>
  //     )}

  //     {/* Error message */}
  //     {error && (
  //       <div className="text-red-500 text-center text-xl my-4">{error}</div>
  //     )}

  //     {/* No Favorite Books Message */}
  //     {!loading && !error && favouriteBooks.length === 0 && (
  //       <div className="sm:text-5xl text-3xl font-semibold text-zinc-500 flex flex-col items-center justify-center w-full h-[80vh]">
  //         No Favourite Books
  //         <img
  //           // src="./star_favourite.png"
  //           src="./no_favourite.png"
  //           alt="star"
  //           className="h-[40vh] w-[40] my-8"
  //         />
  //       </div>
  //     )}

  //     {/* Display Favourite Books */}
  //     {!loading && !error && favouriteBooks.length > 0 && (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //         {favouriteBooks.map((item, i) => (
  //           <div key={i} className="flex justify-center">
  //             <BookCard data={item} favourite={true} />
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Favourites;
