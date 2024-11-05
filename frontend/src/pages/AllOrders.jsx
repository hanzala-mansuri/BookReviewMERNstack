import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";
import { toast } from "react-toastify";


const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookreview-57qn.onrender.com/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error occured,please try again later...")
      }
    };
    fetch();
  }, [AllOrders]);

  const setOptionsButton = (i) => {
    setOptions(i);
  };

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    try {
      const id = AllOrders[i]._id;
      const response = await axios.put(
        `https://bookreview-57qn.onrender.com/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error occured, please try again later...")
    }
  };

  return (
    <>
      {!AllOrders && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {AllOrders && AllOrders.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            No Orders
          </h1>
          <img
            className="h-20 md:h-32 mb-8"
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No Orders"
          />
        </div>
      )}

      {AllOrders && AllOrders.length > 0 && (
        <div className="min-h-screen p-4 md:p-8 text-zinc-100">
          <h1 className="text-2xl md:text-4xl font-semibold text-zinc-500 mb-8 text-center">
            All Orders
          </h1>

          {/* Header Row */}
          <div className="hidden md:flex mt-4 bg-zinc-800 w-full rounded py-2 px-4 gap-2 text-center">
            <div className="w-[5%]">Sr.</div>
            <div className="w-[25%]">Books</div>
            <div className="w-[40%]">Description</div>
            <div className="w-[10%]">Price</div>
            <div className="w-[15%]">Status</div>
            <div className="w-[5%]">
              <FaUserLarge />
            </div>
          </div>

          {/* Order Rows */}
          {AllOrders.map((items, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-4 px-2 md:px-4 flex flex-col md:flex-row gap-2 items-center hover:bg-zinc-900"
            >
              <div className="w-full md:w-[5%] text-center text-sm">
                {i + 1}
              </div>

              {/* Check if items.book exists before rendering the Link */}
              <div className="w-full md:w-[25%] text-left">
                {items.book ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300 truncate block"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-gray-400">
                    Book details unavailable
                  </span>
                )}
              </div>
              <div className="w-full md:w-[40%] text-left hidden md:block truncate">
                {/* Check if items.book and items.book.desc exist */}
                <h1>
                  {items.book?.desc
                    ? items.book.desc.slice(0, 50) + "..."
                    : "Description unavailable"}
                </h1>
              </div>

              <div className="w-full md:w-[10%] text-center text-sm">
                {/* Check if items.book and items.book.price exist */}
                {items.book?.price
                  ? `₹ ${items.book.price}`
                  : "Price unavailable"}
              </div>

              <div className="w-full md:w-[15%] text-center relative text-sm">
                <button
                  onClick={() => setOptionsButton(i)}
                  className="hover:scale-105 transition-all duration-300"
                >
                  {items.status === "Order Placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Cancelled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    <div className="text-green-500">{items.status}</div>
                  )}
                </button>

                {/* Dropdown */}
                {Options === i && (
                  <div className="absolute top-[110%] left-0 z-10 bg-gray-800 p-2 rounded">
                    <select
                      name="status"
                      className="bg-gray-800 text-white p-2 rounded"
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for Delivery",
                        "Delivered",
                        "Cancelled",
                      ].map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                      className="text-green-500 hover:text-pink-600 mx-2"
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full md:w-[5%] text-center">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
          {userDivData && (
            <SeeUserData
              userDivData={userDivData}
              userDiv={userDiv}
              setuserDiv={setuserDiv}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
