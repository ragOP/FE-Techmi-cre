import React from "react";
import { Search } from "lucide-react";
import Vector from "../../../../../assets/services/para/Vector.svg";

const SearchBar = () => {
  return (
    <div className="w-full mt-10 flex flex-col items-center bg-[#F3F9FF] py-6 px-4">
      <div className="w-full max-w-3xl flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">What are you looking for?</h2>
        <div className="flex items-center text-sm text-gray-600 gap-x-2">
          <img src={Vector} alt="Order Icon" className="w-4 h-4" />
          <span>Order with prescription.</span>
          <a href="" className="text-[#00008B] font-semibold">UPLOAD NOW &gt;</a>
        </div>
      </div>

      <div className="relative w-full max-w-3xl">
        <input
          type="text"
          placeholder='search for "headache medicine"'
          className="w-full py-3 pl-10 pr-24 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#00008B] outline-none"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00008B] text-white px-6 py-2 rounded-full text-sm font-semibold">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
