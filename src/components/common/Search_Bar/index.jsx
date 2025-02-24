import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Vector from "../../../assets/services/para/Vector.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../home/featured_products/helper/fetchProducts";
import AnimationSlider from "../animations";
import ProductCard from "../product_card";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query state
  const navigate = useNavigate();

  // Debounce input to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms debounce time

    return () => clearTimeout(handler); // Cleanup timeout on every change
  }, [query]);

  // Fetch products based on debounced search query
  const { data: searchedProducts, isLoading, error } = useQuery({
    queryKey: ["search_products", debouncedQuery],
    queryFn: () => fetchProducts({ params: { search: debouncedQuery } }),
    enabled: debouncedQuery.trim() !== "", // Only fetch when query is not empty
  });

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full mt-10 flex flex-col items-center py-6 px-4">
        <div className="w-full max-w-3xl flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">What are you looking for?</h2>
          <div className="flex items-center text-sm text-gray-600 gap-x-2">
            <img src={Vector} alt="Order Icon" className="w-4 h-4" />
            <span>Order with prescription.</span>
            <a href="#" className="text-[#00008B] font-semibold">UPLOAD NOW &gt;</a>
          </div>
        </div>

        <div className="relative w-full max-w-3xl">
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

      {debouncedQuery.trim() !== "" && (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <>
              {searchedProducts && searchedProducts.length > 0 ? (
                <AnimationSlider>
                  {searchedProducts.map((product) => (
                    <div key={product._id}>
                      <ProductCard
                        image={product.banner_image}
                        price={product.price}
                        name={product.name}
                        discountedPrice={product.discounted_price}
                        smallDescription={product.small_description}
                      />
                    </div>
                  ))}
                </AnimationSlider>
              ) : (
                <div className="text-center text-gray-500">No products found.</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBar;
