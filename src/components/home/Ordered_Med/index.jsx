import React, { useState } from "react";
import AnimationSlider from "../../common/animations";

import ProductCard from "../../common/product_card";
import { fetchProducts } from "../featured_products/helper/fetchProducts";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../loader/LoadingSpinner";
import { fetchCart } from "../../../pages/cart/helper/fecthCart";
import { toast } from "react-toastify";
import { getItem, setItem } from "../../../utils/local_storage";

const OrderedMed = () => {
  const navigate = useNavigate();

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


  const queryClient = useQueryClient();
  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: ({ payload }) =>
      fetchCart({
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      toast.success("Product added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart_products"] });
    },
  });

const handleAddToCart = (product) => {
    const token = getItem("token");
  
    if (!token) {
      const payload = {
        pendingProduct : JSON.stringify(product)
      }
      setItem(payload);
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
      <div className="mt-12">
        <h1 className="text-center text-3xl font-semibold mb-5 text-[#00008B]">
          Most Ordered Medicines
        </h1>

        {isLoading ? (
          <LoadingSpinner />
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
                      onClick={() => navigate(`/product/${product._id}`)}
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

export default OrderedMed;
