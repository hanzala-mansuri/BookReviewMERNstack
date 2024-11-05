import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      {/* Main Heading */}
      <h1
        className="text-5xl text-yellow-100 font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </h1>

      {/* Paragraphs with animations */}
      <div
        className="max-w-4xl text-center space-y-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-xl leading-relaxed">
          Welcome to our platform! Our mission is to provide users with the best
          experience in book reviews and reassessment. Whether you're here to
          discover your next favorite read or to share your thoughts on the
          books you've enjoyed, we're here to help you every step of the way.
        </p>
        <p className="text-xl leading-relaxed">
          Our team consists of book lovers, developers, and passionate readers
          who are dedicated to improving the way people engage with books. We
          believe in the power of literature to transform lives and bring people
          together.
        </p>
        <p className="text-xl leading-relaxed">
          Feel free to explore our app, leave your reviews, and dive into a
          world of endless stories. If you have any questions, don't hesitate to
          reach out to our support team.
        </p>
        <p className="text-xl leading-relaxed">
          We're constantly working to improve our platform and bring you the
          best. So, if you have any feedback or suggestions, then contact us on
          :{" "}
          <a
            className="text-green-500"
            href="mailto: hanzalamansuri11@gmail.com"
          >
            hanzalamansuri11@gmail.com
          </a>
        </p>
      </div>

      {/* Animated CTA Button */}
      {/* <button
        className="mt-12 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Get in Touch
      </button> */}

      {/* Background Element for design */}
      <div
        className="absolute top-20 left-20 bg-purple-500 rounded-full h-56 w-56 opacity-20 filter blur-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></div>
    </div>
  );
};

export default AboutUs;
