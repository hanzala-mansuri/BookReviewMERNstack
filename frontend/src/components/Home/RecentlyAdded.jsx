import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-57qn.onrender.com/api/v1/get-recent-books"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <section className="px-4 mt-20 md:mt-12 relative z-10">
      <h4 className="text-2xl md:text-3xl font-semibold text-yellow-100 text-center py-10 md:py-12">
        Recently Added Books
      </h4>

      {/* Loader visible until data is loaded */}
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {/* Books grid with consistent padding and spacing */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 my-8">
        {Data &&
          Data.map((item, i) => (
            <div key={i} className="p-2">
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
