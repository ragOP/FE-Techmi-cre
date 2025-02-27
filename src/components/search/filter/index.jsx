import React from "react";

const Filter = ({ filters, setFilters, categoriesList }) => {
  const filterOptions = {
    category_id: categoriesList?.map((it) => ({
      value: it._id,
      label: it.name,
    })),
    price: [
      { value: "0_500", label: "₹0 - ₹500" },
      { value: "500_1000", label: "₹500 - ₹1K" },
      { value: "above_1000", label: "ABOVE ₹1K" },
    ],
    // discount: [
    //   { value: "10", label: "10% Off or more" },
    //   { value: "25", label: "25% Off or more" },
    //   { value: "35", label: "35% Off or more" },
    // ],
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category]?.includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...(prevFilters[category] || []), value],
    }));
  };

  return (
    <div className="w-[20%] p-4 bg-white shadow-md rounded-3xl border ml-5">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      {Object.entries(filterOptions).map(([key, values]) => (
        <div key={key} className="mb-4 border-b pb-3">
          <h4 className="font-medium capitalize">{key}</h4>
          {values && values.length > 0 && values.map(({ value, label }) => (
            <label key={value} className="block text-gray-700 mt-2">
              <input
                type="checkbox"
                checked={filters[key]?.includes(value)}
                onChange={() => handleCheckboxChange(key, value)}
                className="mr-2 accent-blue-600"
              />
              {label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;