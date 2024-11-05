import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[75vh] flex flex-col lg:flex-row">
      {/* Left side of hero section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold text-yellow-100">
          Discover Your Next Great Read
        </h1>

        <p className="mt-4 text-base md:text-lg lg:text-xl text-zinc-300 max-w-md">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>

        <Link to="/all-books" className="mt-8">
          <button className="text-yellow-100 text-lg lg:text-xl font-semibold border border-yellow-100 px-8 py-3 hover:bg-zinc-800 rounded-full transition duration-300 ease-in-out">
            Discover Books
          </button>
        </Link>
      </div>

      {/* Right side of hero section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
        <img
          src="./hero.png"
          alt="hero"
          className="max-w-full h-auto lg:h-[90%] object-cover"
        />
      </div>

      
    </section>
    
  );
};

export default Hero;
