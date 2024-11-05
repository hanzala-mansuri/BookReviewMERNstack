import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        // alert("Please fill all the fields");
        toast.error("Please fill all the fields");
        
      } else {
        const response = await axios.post(
          "https://bookreview-57qn.onrender.com/api/v1/sign-in",
          Values
        );

        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // alert("Login successful");
        toast.success("Login Successfull...")
        navigate("/profile");
      }
    } catch (error) {
      // alert(error.response.data.message);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 rounded-lg px-6 py-8 w-full max-w-sm shadow-xl"
      >
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-200 text-2xl font-bold text-center"
        >
          Welcome Back
        </motion.p>

        <motion.div
          className="mt-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="username" className="text-zinc-400">
            Username
          </label>
          <input
            type="text" 
            name="username"
            className="w-full p-2 mt-2 bg-zinc-100 outline-none rounded-md"
            placeholder="Enter Username"
            required autoFocus
            id="username"
            value={Values.username}
            onChange={change}
          />
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-100 text-zinc-900 p-2 outline-none rounded-md"
            placeholder="Enter password"
            name="password"
            id="password"
            required
            value={Values.password}
            onChange={change}
          />
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={submit}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Login
          </button>
        </motion.div>

        <motion.p
          className="flex mt-4 items-center justify-center text-zinc-200 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Or
        </motion.p>

        <motion.p
          className="flex mt-4 items-center justify-center text-zinc-500 font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Not have an account? &nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
