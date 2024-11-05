import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About-us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector( (state) => state.auth.isLoggedIn)
  const role = useSelector( (state) => state.auth.role)
  // console.log(isLoggedIn)

  if(isLoggedIn === false){
    links.splice(3,3)
  }
  if(isLoggedIn == true && role == "user"){
    links.splice(5, 1);
  }
  if(isLoggedIn == true && role === "admin"){
    links.splice(3,2)
  }
  return (
    <div className="flex bg-zinc-800 text-white px-4 py-4 items-center justify-between relative">
      <Link to="/" className="flex items-center">
        <img
          // src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          src="/logo.png"
          alt="logo"
          className="h-10 me-4"
        />
        <h1 className="text-2xl font-semibold">BookReview</h1>
      </Link>

      

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-20" // Ensure button is on top
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IoMenu className="w-6 h-6" />
      </button>

      {/* Links */}
      <div
        className={`absolute lg:static bg-zinc-800 w-full lg:w-auto lg:flex flex-col lg:flex-row transition-transform duration-300 top-14 ${
          isMenuOpen ? "block z-10" : "hidden lg:block"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:gap-4">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="block px-4 py-2 hover:bg-blue-500 font-semibold text-xl transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          {/* Login and SignUp */}
          {!isLoggedIn && (
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-4 lg:mt-0">
              <Link
                to="/login"
                className="font-semibold text-xl px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="font-semibold text-xl px-4 py-2 border border-blue-500 rounded bg-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
