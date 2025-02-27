import { useQuery } from "@tanstack/react-query";
import AnimationSlider from "../../../../common/animations"
import ProductCard from "../../../../common/product_card"
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";
import { useLocation, useNavigate } from "react-router";

export const PharmaSearchProducts = ({ debouncedQuery }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const selectedServiceId = location.state?.selectedCardId || null;

    const params = {
        search: debouncedQuery,
        service_id: selectedServiceId
    }

    const { data: searchedProducts, isLoading, error } = useQuery({
        queryKey: ["search_products", params],
        queryFn: () => fetchProducts({ params }),
        enabled: debouncedQuery?.trim() !== "",
    });

    const onNavigateToProduct = (product) => {
        navigate(`/product/${product._id}`);
    }

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
                    </>
                )
            }
        </>
    )

}