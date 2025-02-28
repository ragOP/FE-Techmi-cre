import React from "react";
import AnimationSlider from "../../../../common/animations";
import ProductCard from "../../../../common/product_card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../../loader/LoadingSpinner";

const Trendingnew = () => {
    const navigate = useNavigate();

    const params = {
        is_best_seller: true,
        page: 1,
        per_page: 10,
    }

    const { data: topPharmaProducts, isLoading, error } = useQuery({
        queryKey: ['top_pharma_products'],
        queryFn: () => fetchProducts({ params }),
    });

    const onNavigateToProduct = (product) => {
        navigate(`/product/${product._id}`);
    }

    return (
        <div className="mt-20 ">
            <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">
                Trending near you products
            </h1>

            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {topPharmaProducts && topPharmaProducts.length > 0 ? (
                        <AnimationSlider>
                            {topPharmaProducts.map((product) => (
                                <div key={product._id}>
                                    <ProductCard
                                        image={product.banner_image}
                                        price={product.price}
                                        name={product.name}
                                        discountedPrice={product.discounted_price}
                                        smallDescription={product.small_description}
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
    );
};


export default Trendingnew;