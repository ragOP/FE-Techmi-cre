import React from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../../home/Categ_Options/helpers/fetchCategories";

const CategoriesPhaema = () => {


  const { data: pharmaCategories, isLoading, error } = useQuery({
    queryKey: ['pharma_categories'],
    queryFn: fetchCategories,
  });

  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold text-[#00008B]">
        Shop By Categories
      </h1>

      {isLoading ?
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading categories...</p>
        </div>
        :
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4">
          {pharmaCategories && pharmaCategories?.length > 0 && pharmaCategories.map((category) => (
            <CategoriesPharmaCard
              key={category?._id}
              image={category?.images?.[0]}
              name={category?.name}
              discount={category?.discount}
            />
          ))}
        </div>}


    </div>
  );
};

export default CategoriesPhaema;

export const CategoriesPharmaCard = ({ image, name, discount }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
      <img src={image} alt={name} className="w-full h-56 object-contain mx-auto" />
      <h2 className="text-xl font-semibold text-gray-800 mt-4">{name}</h2>
      <p className="text-lg text-[#00008B] font-semibold mt-2">{discount}</p>
    </div>
  )
}
