import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";

const AllBooks = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookreview-57qn.onrender.com/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-8 text-center">
      <h4 className="text-2xl sm:text-3xl lg:text-4xl text-yellow-100 font-semibold mb-6">
        All Books
      </h4>

      {/* Loader - Visible until data is available */}
      {!Data && (
        <div className="flex h-60 items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {/* Book Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 my-8">
        {Data &&
          Data.map((items, i) => (
            <div key={i} className="flex justify-center">
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
