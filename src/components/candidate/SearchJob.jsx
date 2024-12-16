import React from "react";

const SearchJob = () => {
  return (
    <form action="/" method="POST" className="mt-8 ">
      <div className="bg-white flex gap-4 p-2 rounded items-center justify-between sm:flex-row sm:justify-center">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Job Title,keywords, or Phrase"
          className="py-3 px-2 w-full placeholder:text-neutral-800 font-semibold shadow-none border-b-2 border-blue-700 active:outline-none focus-within:outline-none"
          required
        />

        <input
          placeholder="email"
          type="emial"
          className="py-3 px-2 w-full placeholder:text-neutral-800 font-semibold shadow-none border-b-2 border-blue-700 active:outline-none focus-within:outline-none"
        />
        <input
          placeholder="sector"
          type="emial"
          className="py-3 px-2 shadow-none placeholder:text-neutral-800 font-semibold w-full border-b-2 border-blue-700 active:outline-none focus-within:outline-none"
        />

        <Button className="inline-flex items-center justify-center flex-shrink-0 w-auto px-4 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md sm:mt-0  sm:w-auto hover:bg-blue-700 focus:bg-blue-700">
          Find Jobs
        </Button>
      </div>
    </form>
  );
};

export default SearchJob;
