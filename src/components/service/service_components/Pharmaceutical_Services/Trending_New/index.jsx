import React from "react";
import AnimationSlider from "../../../../common/animations";
import ProductCard from "../../../../common/product_card";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";

const Trendingnew = () => {
    const { data: topPharmaProducts, isLoading, error } = useQuery({
        queryKey: ['top_pharma_products'],
        queryFn: fetchProducts,
    });

    return (
        <div className="mt-20 ">
            <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">
                Trending near you products
            </h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">Loading products...</p>
                </div>
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