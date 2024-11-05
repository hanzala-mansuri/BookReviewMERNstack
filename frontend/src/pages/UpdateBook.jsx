import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateBook = () => {
  const { id } = useParams();
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
    bookid: id, // id is taken from useParams()
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://bookreview-57qn.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data); // Store the data from the response
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error(
          "Error in fetching book details, please try again later..."
        );

      }
    };
    fetchBookDetails();
  }, [id]);

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
        const response = await axios.put(
          "https://bookreview-57qn.onrender.com/api/v1/update-book",
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
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4 flex items-center justify-center">
      <div className="p-6 bg-zinc-800 rounded w-full md:w-4/6 lg:w-3/6 xl:w-2/6">
        <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center">
          Update Book
        </h1>
        <div>
          <label htmlFor="url" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            placeholder="url of image"
            name="url"
            required
            onChange={change}
            value={Data.url}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="title" className="text-zinc-400">
            Title
          </label>
          <input
            type="text"
            placeholder="title of book"
            name="title"
            required
            onChange={change}
            value={Data.title}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="author" className="text-zinc-400">
            Author
          </label>
          <input
            type="text"
            placeholder="author of book"
            name="author"
            required
            onChange={change}
            value={Data.author}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <label htmlFor="language" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              placeholder="language of book"
              name="language"
              required
              onChange={change}
              value={Data.language}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="price" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              placeholder="price of book"
              name="price"
              required
              onChange={change}
              value={Data.price}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="desc" className="text-zinc-400">
            Description
          </label>
          <textarea
            name="desc"
            rows="5"
            placeholder="description of Book"
            required
            value={Data.desc}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        <button
          onClick={submit}
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300 w-full"
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
