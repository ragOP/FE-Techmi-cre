import React from "react";
import AnimationSlider from "../../common/animations";
import ProductCard from "../../common/product_card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../featured_products/helper/fetchProducts";
import { useNavigate } from "react-router-dom";
const SellingServices = () => {
  const params = {
    is_best_seller: true,
    page: 1,
    per_page: 10,
  }
  const navigate = useNavigate();

  const { data: superSellingProducts, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts({ params }),
  });

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
                      id={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
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
