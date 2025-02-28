import React from "react"
import AnimationSlider from "../../common/animations"
import ProductCard from "../../common/product_card"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "./helper/fetchProducts"
import ProductLoader from "../../loader/ProductLoader"
import { useNavigate } from "react-router-dom";
const FeaturedProducts = () => {

  const params = {
    is_best_seller: true,
    page: 1,
    per_page: 10,
  }

  const { data: topProducts, isLoading, error } = useQuery({
    queryKey: ['top_products'],
    queryFn: () => fetchProducts({ params }),
  });

  const navigate = useNavigate();

  return (
    <div className="mt-20">
      <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">
        Our Best Products
      </h1>

      {isLoading ? (
        <ProductLoader />
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
  );
};

export default FeaturedProducts;
