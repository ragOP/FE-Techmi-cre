import React, { useEffect } from "react"

import img1 from "../../../../../assets/services/laundry/1.svg"
import img2 from "../../../../../assets/services/laundry/2.svg"
import img3 from "../../../../../assets/services/laundry/3.svg"
import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../../../../home/Categ_Options/helpers/fetchCategories"
import { HomeCleaningCard } from "../../House_Cleaning/Our_service"
import LoadingSpinner from "../../../../loader/LoadingSpinner"

const OurServices = ({ setFilterCategories, selectedCategory, setSelectedCategory }) => {

  const location = useLocation()
  const selectedServiceId = location.state?.selectedCardId || null;

  const selectedCategoryId = selectedCategory?._id

  const params = {
    service_id: selectedServiceId
  }

  const { data: laundryCategories, isLoading, error } = useQuery({
    queryKey: ['laundry_services'],
    queryFn: () => fetchCategories({ params }),
  });

  const onClickCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    setFilterCategories(laundryCategories);
  }, [laundryCategories])

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-center md:px-14">
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 text-center">
          Types of Laundry Service We offer
        </h2>

        <div>
          <button className="lg:text-lg xl:text-xl bg-[#00008B] text-white font-medium py-2 px-6 rounded-full">
            Let Us Handle The Dirty Work!
          </button>
        </div>
      </div>

      <div className="flex justify-evenly flex-wrap mt-10 mb-20 gap-7 lg:gap-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 xl:w-[75%] w-[90%] mx-auto">
          {isLoading ?
            <div className="flex justify-center items-center h-40">
              <LoadingSpinner />
            </div>
            : laundryCategories.map((category) => (
              <HomeCleaningCard
                onClick={() => onClickCategory(category)}
                key={category?._id}
                category={category}
                isSelected={selectedCategoryId === category?._id}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default OurServices
