import React from "react";
import AnimationSlider from "../../common/animations";

import ProductCard from "../../common/product_card";
import { fetchProducts } from "../../home/featured_products/helper/fetchProducts";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const CartAlternativeProduct = () => {
  const navigate = useNavigate();

  const params = {
    is_best_seller: true,
    page: 1,
    per_page: 10,
  }

  const { data: topOrderedProducts, isLoading, error } = useQuery({
    queryKey: ['top_ordered_products'],
    queryFn: () => fetchProducts({ params }),
  });

  const onNavigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
  }

  return (
    <>
      <div className="mt-12">
        <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">Alternative Products</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <>
            {topOrderedProducts && topOrderedProducts.length > 0 ? (
              <AnimationSlider>
                {topOrderedProducts.map((product) => (
                  <div key={product._id}>
                    <ProductCard
                      image={product.banner_image}
                      price={product.price}
                      name={product.name}
                      discountedPrice={product.discounted_price}
                      smallDescription={product.small_description}
                      id={product._id}
                      onClick={() => onNavigateToProduct(product)}
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


export default CartAlternativeProduct;
