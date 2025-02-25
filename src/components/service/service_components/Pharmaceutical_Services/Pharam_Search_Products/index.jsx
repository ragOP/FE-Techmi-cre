import { useQuery } from "@tanstack/react-query";
import AnimationSlider from "../../../../common/animations"
import ProductCard from "../../../../common/product_card"
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";

export const PharmaSearchProducts = ({ debouncedQuery }) => {

    const { data: searchedProducts, isLoading, error } = useQuery({
        queryKey: ["search_products", debouncedQuery],
        queryFn: () => fetchProducts({ params: { search: debouncedQuery } }),
        enabled: debouncedQuery?.trim() !== "",
    });

    return (
        <>
            {
                debouncedQuery?.trim() !== "" && (
                    <>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <p className="text-gray-500">Loading products...</p>
                            </div>
                        ) : (
                            <>
                                {searchedProducts && searchedProducts.length > 0 ? (
                                    <AnimationSlider>
                                        {searchedProducts.map((product) => (
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
                    </>
                )
            }
        </>
    )

}