import React from "react"
import Image from "../image"
import arrow from "../../../assets/product_card/arrow-up-right.svg"

const ProductCard = ({ item: { id, img, price, originalPrice, title, desc } }) => {
  return (
    <div className="shadow-[#0000004D] shadow-lg mb-5 lg:h-[30rem] xl:h-[40rem] rounded-2xl p-4 max-h-fit relative">
      <img
        src={arrow}
        className="bg-[#82C8E5] rounded-full scale-75 p-2 absolute right-0 top-0"
        alt=""
      />
      <Image
        src={img}
        alt={title}
        css="rounded-2xl h-[50%] w-full object-cover"
      />
      
      <div className="mt-2">
        <p className="text-[#00008B] font-semibold text-lg">
          ₹{price}/
          <span className="text-gray-500 line-through text-sm ">{originalPrice}</span>
        </p>
      </div>

      <p className="text-[#191919] mt-0.5">
        {title.length <= 23 ? title : `${title.slice(0, 23)}...`}
      </p>
      <p className="text-[#444444] mt-0.5 text-sm">
        {desc.length <= 27 ? desc : `${desc.slice(0, 27)}...`}
      </p>
    </div>
  )
}

export default ProductCard
