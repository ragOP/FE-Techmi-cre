import React, { useState } from "react";
import AnimationSlider from "../../common/animations";
import ProductCard from "../../common/product_card";
import { fetchProducts } from "../../home/featured_products/helper/fetchProducts";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../loader/LoadingSpinner";
import { fetchCart } from "../../../pages/cart/helper/fecthCart";
import { toast } from "react-toastify";
import { getItem } from "../../../utils/local_storage";

const LastMinuteBuy = () => {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();

  const [selectedId, setSelectedId] = useState(null);

  const params = {
    is_best_seller: true,
    page: 1,
    per_page: 10,
  };

  const {
    data: topOrderedProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top_ordered_products"],
    queryFn: () => fetchProducts({ params }),
  });

  const onNavigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
  };

  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: ({ payload }) =>
      fetchCart({
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      toast.success("Product added to cart!");
      QueryClient.invalidateQueries({ queryKey: ["cart_products"] });
      navigate("/cart");
    },
  });

  const handleAddToCart = (product) => {
    const token = getItem("token");

    if (!token) {
      return navigate("/login");
    }

    if (isPending) return;

    const userId = getItem("userId");

    setSelectedId(product._id);
    const payload = {
      user_id: userId,
      product_id: product?._id,
      quantity: 1,
    };

    addToCartMutation({ payload });
  };

  return (
    <>
      <div className="mt-8 min-h-[30vh]">
        <h1 className="text-center text-3xl font-semibold mb-8 text-[#00008B]">
          Last Minute Buy
        </h1>

        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
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
                      selectedId={selectedId}
                      onAddToCart={() => handleAddToCart(product)}
                      isProductAdd={isPending}
                    />
                  </div>
                ))}
              </AnimationSlider>
            ) : (
              <div className="text-center text-gray-500">
                No products found.
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LastMinuteBuy;
