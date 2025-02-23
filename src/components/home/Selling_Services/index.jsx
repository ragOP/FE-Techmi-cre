import React, { useState } from "react";
import AnimationSlider from "../../common/animations";

import ProductCard from "../../common/product_card";

const dummyData = [
  { id: 1, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 8999, title: "House Cleaning", desc: "Sticky top navigation with a search bar, category" },
  { id: 2, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 8999, title: "Dry Cleaning", desc: "Sticky top navigation with a search bar, category " },
  { id: 3, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 500, title: "Clothes Cleaning", desc: "Sticky top navigation with a search bar, category " },
  { id: 4, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 483, title: "Laundry", desc: "Sticky top navigation with a search bar, category" },
];


const SellingServices = () => {

  return (
    <>
      <div className="mt-20">
        <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">Super Selling Services</h1>
        <AnimationSlider>
          {dummyData.map((item) => (
            <div key={item.id} className="">
              <ProductCard item={item} />
            </div>
          ))}
        </AnimationSlider>
      </div>
    </>
  );
}


export default SellingServices;
