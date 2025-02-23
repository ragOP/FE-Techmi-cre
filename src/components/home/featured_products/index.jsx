import React from "react"
import AnimationSlider from "../../common/animations"
import ProductCard from "../../common/product_card"
import { useQuery } from "@tanstack/react-query"
import { fetchTopProducts } from "./helper/fetchTopProducts"

// const dummyData = [
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: 12.99,
//     title: "Paracetamol 500mg Tablets",
//     desc: "Effective pain reliever and fever reducer. Suitable for adults and children.",
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: 8.49,
//     title: "Cough Syrup 100ml",
//     desc: "Soothing syrup for dry and wet cough relief. Non-drowsy formula.",
//   },
//   {
//     id: 3,
//     img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: 25.99,
//     title: "Vitamin C Tablets (60 Count)",
//     desc: "Boosts immunity and improves overall health. 1000mg per tablet.",
//   },
//   {
//     id: 4,
//     img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: 15.99,
//     title: "Hand Sanitizer 500ml",
//     desc: "Alcohol-based sanitizer with antibacterial properties for germ protection.",
//   },
//   {
//     id: 5,
//     img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     price: 49.99,
//     title: "Digital Blood Pressure Monitor",
//     desc: "Automatic BP monitor with large display and memory storage for tracking.",
//   },
// ]

const FeaturedProducts = () => {
  const { data: topProducts, isLoading, error } = useQuery({
    queryKey: ['top_products'],
    queryFn: fetchTopProducts,
  });

  return (
    <div className="mt-20">
      <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">
        Our Best Products
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <>
          {topProducts && topProducts.length > 0 ? (
            <AnimationSlider>
              {topProducts.map((product) => (
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
  );
};

export default FeaturedProducts;
