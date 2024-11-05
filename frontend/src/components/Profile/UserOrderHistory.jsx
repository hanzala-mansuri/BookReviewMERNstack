import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-57qn.onrender.com/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.log(error || "in get-order-history");
        toast.error("An unexpected response occurred,Please try again later...");
      }
    };
    fetch();
  }, []);

  return (
    <>
      {/* Show loader until UserOrderHistory is rendering */}
      {!OrderHistory && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              className="h-[20vh] mb-8"
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No order History"
            />
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className="min-h-screen p-4 md:p-8 text-zinc-100">
          <h1 className="text-2xl md:text-4xl font-semibold text-zinc-500 mb-8 text-center">
            Your Order History
          </h1>

          {/* Header Row for large screens */}
          <div className="hidden md:flex mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2 text-center">
            <div className="w-[5%]">Sr.</div>
            <div className="w-[25%]">Books</div>
            <div className="w-[40%]">Description</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%]">Status</div>
          </div>

          {/* Order Rows */}
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-4 px-2 md:px-4 flex flex-col md:flex-row gap-2 items-center hover:bg-zinc-900"
            >
              {/* Serial Number */}
              <div className="w-full md:w-[5%] text-center text-sm">
                {i + 1}
              </div>

              {/* Book Title */}
              <div className="w-full md:w-[25%] text-left">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300 truncate block"
                >
                  {items.book.title}
                </Link>
              </div>

              {/* Book Description */}
              <div className="w-full md:w-[40%] text-left hidden md:block truncate">
                {items.book.desc
                  ? items.book.desc.slice(0, 50) + "..."
                  : "Description unavailable"}
              </div>

              {/* Price */}
              <div className="w-full md:w-[10%] text-center text-sm">
                &#8377; {items.book.price}
              </div>

              {/* Status */}
              <div className="w-full md:w-[15%] text-center">
                {items.status === "Order Placed" ? (
                  <span className="text-yellow-500">{items.status}</span>
                ) : items.status === "Cancelled" ? (
                  <span className="text-red-500">{items.status}</span>
                ) : (
                  <span className="text-green-500">{items.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
