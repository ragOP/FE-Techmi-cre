import React, { useState } from "react";
import AnimationSlider from "../../common/animations";

import ProductCard from "../../common/product_card";
import { useQuery } from "@tanstack/react-query";
import { fetchTopProducts } from "../featured_products/helper/fetchTopProducts";

const dummyData = [
  { id: 1, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 8999, title: "House Cleaning", desc: "Sticky top navigation with a search bar, category" },
  { id: 2, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 8999, title: "Dry Cleaning", desc: "Sticky top navigation with a search bar, category " },
  { id: 3, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 500, title: "Clothes Cleaning", desc: "Sticky top navigation with a search bar, category " },
  { id: 4, img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", price: 483, title: "Laundry", desc: "Sticky top navigation with a search bar, category" },
];


const SellingServices = () => {

  const { data: superSellingProducts, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchTopProducts,
  });

  console.log(superSellingProducts);


  return (
    <>
      <div className="mt-20">
        <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">Super Selling Services</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <>
            {superSellingProducts && superSellingProducts.length > 0 ? (
              <AnimationSlider>
                {superSellingProducts.map((product) => (
                  <div key={product._id}>
                    <ProductCard
                      image={product.banner_image}
                      price={product.price}
                      name={product.name}
                      discountedPrice={product.discounted_price}
                      smallDescription={product.small_description}
                    />
                  </div>
                ))}
              </AnimationSlider>
            ) : (
              <div className="text-center text-gray-500">No products found.</div>
            )}
          </>
        )}
      </div>
    </>
  );
}


export default SellingServices;
