import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";
import ProductCard from "../../../../common/product_card";
import { useNavigate } from "react-router";
import { getItem } from "../../../../../utils/local_storage";
import { fetchCart } from "../../../../../pages/cart/helper/fecthCart";
import LoadingSpinner from "../../../../loader/LoadingSpinner";
import { toast } from "react-toastify";
import { useState } from "react";

const HouseCleaningProducts = ({ category }) => {
    const navigate = useNavigate()
    const [selectedId, setSelectedId] = useState(null);

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




    const { mutate: addToCartMutation, isPending } = useMutation({
        mutationFn: ({ payload }) => fetchCart({
            method: "POST",
            body: payload
        }),
        onSuccess: () => {
            toast.success("Product added to cart!");
            navigate("/cart");
        },
    });

    const handleAddToCart = (product) => {
        setSelectedId(product._id);
        const payload = {
            user_id: getItem("userId"),
            product_id: product?._id,
            quantity: 1,
        }
        console.log(">>>>", payload)

        addToCartMutation({ payload });
    };

    return (
        <div className="md:px-12 space-y-2 pt-8">
            <h1 className="text-3xl font-semibold text-center">{name}</h1>
            {isLoading ? (
                <LoadingSpinner />
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
                                        id={product._id}
                                        discountedPrice={product.discounted_price}
                                        smallDescription={product.small_description}
                                        onAddToCart={() => handleAddToCart(product)}
                                        showAddToCart={true}
                                        isProductAdd={isPending}
                                        selectedId={selectedId}
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