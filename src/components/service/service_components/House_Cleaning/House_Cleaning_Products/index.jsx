import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";
import AnimationSlider from "../../../../common/animations";
import ProductCard from "../../../../common/product_card";

const HouseCleaningProducts = ({ category }) => {

    const name = category?.name;
    const id = category?._id;

    const params = {
        category_id: id,
        page: 1,
        per_page: 10,
    }

    const { data: houseCleaningProducts, isLoading, error } = useQuery({
        queryKey: ['top_products', id],
        queryFn: () => fetchProducts({ params }),
    });

    return (
        <div className="md:px-12 space-y-2 pt-8">
            <h1 className="text-3xl font-semibold text-center">{name}</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">Loading products...</p>
                </div>
            ) : (
                <>
                    {houseCleaningProducts && houseCleaningProducts.length > 0 ? (
                        <div className="flex flex-col md:flex-row p-4 gap-8 justify-center items-center">
                            {houseCleaningProducts.map((product) => (
                                <div key={product._id} className="w-full md:w-1/4">
                                    <ProductCard
                                        image={product.banner_image}
                                        price={product.price}
                                        name={product.name}
                                        discountedPrice={product.discounted_price}
                                        smallDescription={product.small_description}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">No products found.</div>
                    )}
                </>
            )}
        </div>
    );
}

export default HouseCleaningProducts;