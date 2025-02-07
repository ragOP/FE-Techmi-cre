import React, { useState } from "react";
import AnimationSlider from "../../../../common/animations";
import ProductCard from "../../../../common/product_card";

const Newproduct = () => {
    const [products, setProducts] = useState([
        {
          id: 1,
          img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 256,
          originalPrice: 599,
          title: "Tropeaka Lean Protein Salted",
          desc: "icky top navigation with a search bar, category dropdowns,",
        },
        {
          id: 2,
          img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 256,
          originalPrice: 599,
          title: "Cough Syrup 100ml",
          desc: "Soothing syrup for dry and wet cough relief. Non-drowsy formula.",
        },
        {
          id: 3,
          img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 256,
          originalPrice: 599,
          title: "Vitamin C Tablets (60 Count)",
          desc: "Boosts immunity and improves overall health. 1000mg per tablet.",
        },
        {
          id: 4,
          img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 256,
          originalPrice: 599,
          title: "Hand Sanitizer 500ml",
          desc: "Alcohol-based sanitizer with antibacterial properties for germ protection.",
        },
        {
          id: 5,
          img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 256,
          originalPrice: 599,
          title: "Digital Blood Pressure Monitor",
          desc: "Automatic BP monitor with large display and memory storage for tracking.",
        },
      ]);
    
      return (
        <div className="mt-20 ">
          <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">
            Our Best Products
          </h1>
          <AnimationSlider>
            {products.map((item) => (
              <div key={item.id}>
                <ProductCard item={item} />
              </div>
            ))}
          </AnimationSlider>
        </div>
      );
    };


export default Newproduct;