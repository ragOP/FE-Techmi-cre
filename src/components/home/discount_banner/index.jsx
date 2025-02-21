import React, { useState } from 'react';
import Image from "../../common/image/index";

import backgroundgreen from '../../../assets/discounted/Background_green.jpg'; 
import medicine from '../../../assets/discounted/bn_img.svg'; 

const DiscountBanner = () => {
  const [discountPercentage, setDiscountPercentage] = useState(10); 
  const [medicineImage, setMedicineImage] = useState(medicine); 

  return (
    <div className="relative mt-52 mb-10 flex  justify-center">
      <img 
        src={backgroundgreen} 
        alt="Background Green" 
        className=" sm:h-36 h-80 w-full rounded-lg"
      />

      <div className="absolute inset-0 flex flex-col sm:flex-row justify-center  items-center md:justify-start px-6  ">
        <Image 
          src={medicineImage} 
          alt="medicine"
          css="h-56 sm:h-72 lg:h-96"
        />
        
        <div className="text-center md:text-left md:ml-6">
          <p className="lg:text-3xl md:text-2xl sm:text-xl text-base text-start text-white">
            Save up to <strong>{discountPercentage}%</strong> extra, enjoy <strong>FREE</strong> delivery with <strong>PLUS</strong> membership
          </p>
          
          <button className="mt-4 bg-[#00008B] rounded-3xl text-white font-bold py-2 px-4">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
