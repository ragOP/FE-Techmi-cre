import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Vector from "../../../assets/services/para/Vector.svg";

const SearchBar = ({ debouncedQuery, setDebouncedQuery }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query && query?.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">
          What are you looking for?
        </h2>
        {/* <div className="flex items-center text-sm text-gray-600 gap-x-2">
          <img src={Vector} alt="Order Icon" className="w-4 h-4" />
          <span>Order with prescription.</span>
          <a href="#" className="text-[#00008B] font-semibold">
            UPLOAD NOW &gt;
          </a>
        </div> */}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for "headache medicine"'
          className="w-full py-3 pl-10 pr-24 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#00008B] outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />

        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00008B] text-white px-6 py-2 rounded-full text-sm font-semibold hidden sm:block"
        >
          Search
        </button>
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00008B] text-white p-2 rounded-full sm:hidden"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
