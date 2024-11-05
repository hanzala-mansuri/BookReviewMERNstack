import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddBook = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        // alert("Please fill all the fields ");
        toast.error("Please fill all the fields ");
      } else {
        const response = await axios.post(
          "https://bookreview-57qn.onrender.com/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        // alert(response.data.message);
        toast.success(response.data.message);
        navigate("/all-books");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred, please try again later...")
    }
  };

  return (
    <div className="p-4 md:p-8 lg:px-16 lg:py-12 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-zinc-500 mb-6 md:mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded w-full max-w-2xl">
        {/* Image URL */}
        <div className="mb-4">
          <label className="text-zinc-400">Image</label>
          <input
            type="text"
            placeholder="URL of image"
            name="url"
            required
            onChange={change}
            value={Data.url}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-zinc-400">Title</label>
          <input
            type="text"
            placeholder="Title of book"
            name="title"
            required
            onChange={change}
            value={Data.title}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="text-zinc-400">Author</label>
          <input
            type="text"
            placeholder="Author of book"
            name="author"
            required
            onChange={change}
            value={Data.author}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
          />
        </div>

        {/* Language and Price */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              placeholder="Language of book"
              name="language"
              required
              onChange={change}
              value={Data.language}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              placeholder="Price of book"
              name="price"
              required
              onChange={change}
              value={Data.price}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-zinc-400">Description</label>
          <textarea
            name="desc"
            rows="5"
            placeholder="Description of book"
            required
            value={Data.desc}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submit}
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
