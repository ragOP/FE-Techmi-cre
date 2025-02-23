import React from "react"
import Image from "../image"
import arrow from "../../../assets/product_card/arrow-up-right.svg"

const ProductCard = ({
  image,
  price,
  discountedPrice,
  name,
  smallDescription
}) => {
  return (
    <div className="shadow-[#0000004D] shadow-lg mb-5 lg:h-[30rem] h-[30rem] xl:h-[40rem] rounded-2xl p-4 max-h-fit relative">
      <img
        src={arrow}
        className="bg-[#82C8E5] rounded-full scale-75 p-2 absolute right-2 top-2"
        alt=""
      />
      <Image
        src={image}
        alt={name}
        css="rounded-2xl h-[50%] w-full object-cover"
      />

      <div className="mt-2">
        <p className="text-[#00008B] font-semibold text-lg">
          ₹{discountedPrice || 0}/
          <span className="text-gray-500 line-through text-sm ">{price || 0}</span>
        </p>
      </div>

      <p className="text-[#191919] mt-0.5">
        {name?.length <= 20 ? name : `${name?.slice(0, 20)}...`}
      </p>
      <p className="text-[#444444] mt-0.5 text-sm">
        {smallDescription?.length <= 25 ? smallDescription : `${smallDescription?.slice(0, 25)}...`}
      </p>
    </div>
  )
}

export default ProductCard
