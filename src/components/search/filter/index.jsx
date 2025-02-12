import React from "react";

const filterOptions = {
  category: ["Mama Earth", "Cetaphile", "Himalaya", "Biotique", "Nivea"],
  brand: ["Shampoo", "Face Cream", "Body Lotion"],
  price: ["₹0 - ₹500", "₹500 - ₹1K", "ABOVE ₹1K"],
  discount: ["10% Off or more", "25% Off or more", "35% Off or more"],
};

const Filter = ({ filters, setFilters }) => {
  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category]?.includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...(prevFilters[category] || []), value],
    }));
  };

  return (
    <div className="w-64 p-4 bg-white shadow-md rounded-3xl border ml-5">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="flex gap-2 mb-4">
        {["In-stock", "Express"].map((tag) => (
          <button key={tag} className="border px-3 py-1 rounded-full text-gray-700">
            {tag}
          </button>
        ))}
      </div>

      {Object.entries(filterOptions).map(([key, values]) => (
        <div key={key} className="mb-4 border-b pb-3">
          <h4 className="font-medium capitalize">{key}</h4>
          {values.map((value) => (
            <label key={value} className="block text-gray-700 mt-2">
              <input
                type="checkbox"
                checked={filters[key]?.includes(value)}
                onChange={() => handleCheckboxChange(key, value)}
                className="mr-2 accent-blue-600"
              />
              {value}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;
