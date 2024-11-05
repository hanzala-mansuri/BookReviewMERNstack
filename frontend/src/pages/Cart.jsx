import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://bookreview-57qn.onrender.com/api/v1/get-user-cart",
        { headers }
      );
      setCart(res.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `https://bookreview-57qn.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    // alert(response.data.message);
    toast.success(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += parseFloat(items.price);
      });
      setTotal(total);
    }
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        "https://bookreview-57qn.onrender.com/api/v1/place-order",
        { order: Cart },
        { headers }
      );
      // alert(response.data.message)
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error || "during place order");
      toast.error("Error in Place Order,please try again later...")
    }
  };

  return (
    <div className="bg-zinc-900 px-4 lg:px-12 h-screen py-8">
      {!Cart && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="h-full flex items-center justify-center flex-col">
          <h1 className="text-3xl lg:text-5xl font-semibold text-zinc-400 text-center">
            Your Cart is Empty
          </h1>
          <img
            src="./empty_cart_2.png"
            alt="empty cart"
            className="w-full max-w-xs lg:max-w-md mt-8"
          />
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-3xl lg:text-5xl font-semibold text-zinc-500 mb-8 text-center lg:text-left">
            Your Cart
          </h1>
          <div className="flex flex-col space-y-4">
            {Cart.map((items, i) => (
              <div
                key={i}
                className="w-full rounded flex flex-col md:flex-row p-4 bg-zinc-800 items-center md:justify-between"
              >
                <img
                  src={items.url}
                  alt="cart-img"
                  className="h-40 md:h-20 w-50 md:w-24"
                />

                <div className="w-full mt-4 md:mt-0 md:w-auto text-center md:text-left">
                  <h1 className="text-xl md:text-2xl text-zinc-100 font-semibold">
                    {items.title}
                  </h1>
                  <p className="text-sm md:text-base text-zinc-300 mt-2 hidden md:block">
                    {items.desc.length > 80
                      ? items.desc.slice(0, 80) + "..."
                      : items.desc}
                  </p>
                  <p className="text-sm text-zinc-300 mt-2 block md:hidden">
                    {items.desc.length > 50
                      ? items.desc.slice(0, 50) + "..."
                      : items.desc}
                  </p>
                </div>

                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-2xl md:text-3xl font-semibold flex">
                    &#8377; {items.price}
                  </h2>
                  <button
                    onClick={() => deleteItem(items._id)}
                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4 md:ml-12"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className="mt-8 w-full flex items-center justify-center lg:justify-end">
          <div className="p-4 bg-zinc-800 rounded w-full max-w-lg">
            <h1 className="text-2xl lg:text-3xl text-zinc-200 font-semibold text-center lg:text-start">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-lg lg:text-xl text-zinc-200">
              <h2>{Cart.length} Books</h2>
              <h2>&#8377; {Total}</h2>
            </div>
            <div className="mt-4">
              <button
                onClick={PlaceOrder}
                className="bg-zinc-100 rounded px-4 py-2 w-full font-semibold"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
