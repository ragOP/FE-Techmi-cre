import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react"
import { useLocation } from "react-router";
import { fetchCategories } from "../../../../home/Categ_Options/helpers/fetchCategories";
import LoadingSpinner from "../../../../loader/LoadingSpinner";

const Services = ({ setFilterCategories, setSelectedCategory, selectedCategory }) => {
  const location = useLocation()
  const selectedServiceId = location.state?.selectedCardId || null;

  const selectedCategoryId = selectedCategory?._id;

  const params = {
    service_id: selectedServiceId,
  };

  const {
    data: houseCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["house_cleaning"],
    queryFn: () => fetchCategories({ params }),
  });

  const onClickCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setFilterCategories(houseCategories)
    console.log(houseCategories, ">>>>>> housing")
  }, [houseCategories])

  return (
    <div className=" py-10">
      <div className="flex justify-between items-center xl:w-[75%] w-[90%] mx-auto py-6">
        <div className="">
          <h2 className="xl:text-3xl text-2xl font-bold mb-2">
            Our Services, We Clean It All - Big or Small!
          </h2>
          <p className="xl:text-xl text-lg ">
            Explore our wide range of cleaning services designed for your
            lifestyle
          </p>
        </div>

        <div>
          <button className="bg-gradient-to-r xl:text-xl text-lg from-gray-300 to-blue-200 text-black font-semibold py-2 px-6 rounded-full shadow-md hover:opacity-80 transition">
            Let Us Handle The Dirty Work!
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 xl:w-[75%] w-[90%] mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoadingSpinner />
          </div>
        ) : (
          houseCategories.map((category) => (
            <HomeCleaningCard
              onClick={() => onClickCategory(category)}
              key={category?._id}
              category={category}
              isSelected={selectedCategoryId === category?._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Services;

export const HomeCleaningCard = ({ category, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-3xl shadow-md overflow-hidden border-4 transition-all ${
        isSelected
          ? "border-[#00008b] shadow-lg scale-105"
          : "border-transparent"
      }`}
    >
      <img
        src={category?.images?.[0]}
        alt={category.name}
        className="w-full object-cover h-[20rem]"
      />

      <div className="absolute bottom-0 left-0 w-full text-white xl:p-4 px-2">
        <h3 className="xl:text-2xl text-xl font-semibold text-[#82C8E5]">
          {category.name}
        </h3>
        <p className="text-sm mb-5">{category.description}</p>
      </div>
    </div>
  );
};
