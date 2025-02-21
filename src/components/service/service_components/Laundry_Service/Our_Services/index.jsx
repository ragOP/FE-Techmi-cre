import React from "react"

import img1 from "../../../../../assets/services/laundry/1.svg"
import img2 from "../../../../../assets/services/laundry/2.svg"
import img3 from "../../../../../assets/services/laundry/3.svg"

const OurServices = () => {
  return (
    <div className="px-10">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
          Types of Laundry Service We offer
        </h2>

        <div>
          <button className="lg:text-lg xl:text-xl bg-[#00008B] text-white font-medium py-2 px-6 rounded-full">
            Let Us Handle The Dirty Work!
          </button>
        </div>
      </div>

      <div className="flex justify-evenly flex-wrap mt-10 mb-20 gap-7 lg:gap-0">
        <img src={img1} alt="" className="w-[270px] xl:w-[350px]" />
        <img src={img2} alt="" className="w-[270px] xl:w-[350px]" />
        <img src={img3} alt="" className="w-[270px] xl:w-[350px]" />
      </div>
    </div>
  )
}

export default OurServices
