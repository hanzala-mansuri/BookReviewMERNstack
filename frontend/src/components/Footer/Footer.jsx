import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaBook, FaUser, FaHome, FaReadme } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InstallButton from "../InstallButtonPWA/InstallButton";

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      toast.error("Please log in to access your profile");
      navigate("/login");
    }
  };

  return (
    <footer className="bg-zinc-800 text-white px-4 py-8 md:px-8 md:py-6">
      {/* Top section with links and social icons */}
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Logo and Main Links */}
        <div className="space-y-2 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold">BookReview</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/"
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/all-books"
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              <FaBook /> All Books
            </Link>
            <Link
              to="/about-us"
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              <FaReadme /> About Us
            </Link>
            <button
              onClick={handleProfileClick}
              className="hover:text-yellow-300 flex items-center gap-1"
            >
              <FaUser /> Profile
            </button>
          </div>
        </div>

        {/* Social Media Link with Text */}
        <div className="flex items-center space-x-2 md:space-x-4 mt-4 md:mt-0">
          <a
            href="https://instagram.com/book_review_20"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-yellow-300 transition-colors"
          >
            <FaInstagram size={20} />
            <span className="ml-2 text-sm md:text-base">
              Follow us on Instagram
            </span>
          </a>
        </div>
      </div>

      {/* Install Button */}
      <div className="mt-6 flex justify-center">
        <InstallButton />
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm md:text-base">
        &copy; 2024 All Rights Reserved by Group-20 of Sem 3, GMCA
      </div>
    </footer>
  );
};

export default Footer;
