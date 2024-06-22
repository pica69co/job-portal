import React from "react";

const Hero = () => {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center capitalize">
        Find Your next
        <br /> dream job
      </h1>
      <form className="flex gap-2 mt-4 max-w-md mx-auto">
        <input
          type="search"
          className="w-full rounded-md py-2 px-3 my-4 border border-gray-400"
          placeholder="Search phrase..."
        />
        <button className="w-full h-10 rounded-md bg-blue-600 text-white py-2 px-4 mt-4">
          Search
        </button>
      </form>
    </section>
  );
};

export default Hero;
