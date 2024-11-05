import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        // alert("Please fill all the fields");
           toast.error("Please fill all the fields");
      } else {
        const response = await axios.post(
          "https://bookreview-57qn.onrender.com/api/v1/sign-up",
          Values
        );
        // alert(response.data.message); // If successful
        toast.success(response.data.message); // If successful
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Log the error details from the server
        // alert(error.response.data.message || "Error during signup"); // Show a user-friendly error message
        toast.error(error.response.data.message || "Error during signup");
      } else {
        console.log(error);
        toast.error("Error in sign-up, please try again later...")
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-4/6 lg:w-3/6 xl:w-2/6">
        <p className="text-zinc-200 text-xl text-center">Sign Up</p>

        <div className="mt-4">
          <label htmlFor="username" className="text-zinc-400">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="w-full p-2 mt-2 bg-zinc-100 outline-none"
            placeholder="Username"
            required autoFocus
            id="username"
            value={Values.username}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="text-zinc-400">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-2 bg-zinc-100 text-zinc-900 p-2 outline-none"
            placeholder="xyz@example.com"
            name="email"
            id="email"
            required
            value={Values.email}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-100 text-zinc-900 p-2 outline-none"
            placeholder="password"
            name="password"
            id="password"
            required
            value={Values.password}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="text-zinc-400">
            Address
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-zinc-100 text-zinc-900 p-2 outline-none"
            placeholder="address"
            name="address"
            id="address"
            required
            value={Values.address}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={submit}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:text-blue-500 hover:bg-white transition duration-300"
          >
            Sign Up
          </button>
        </div>

        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>

        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold text-center">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
