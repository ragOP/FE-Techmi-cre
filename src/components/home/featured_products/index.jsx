import React, { useState } from "react";
import AnimationSlider from "../../common/animations";
import ProductCard from "../../common/product_card";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchProducts } from "./helper/fetchProducts";
import ProductLoader from "../../loader/ProductLoader";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../../pages/cart/helper/fecthCart";
import { toast } from "react-toastify";
import { getItem, setItem } from "../../../utils/local_storage";
import { getDiscountBasedOnRole } from "../../../utils/products/getDiscountBasedOnRole";
import ProductEmptyState from "../../empty_state/ProductEmptyState";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);

  const localStorageRole = getItem("role");

  const params = {
    is_best_seller: true,
    page: 1,
    per_page: 10,
  };

  const {
    data: topProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top_products"],
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
        pendingProduct: JSON.stringify(product),
      };
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
              {topProducts.map((product) => {
                const discountPrice = getDiscountBasedOnRole({
                  role: localStorageRole,
                  discounted_price: product.discounted_price,
                  salesperson_discounted_price:
                    product.salesperson_discounted_price,
                  dnd_discounted_price: product.dnd_discounted_price,
                });

                return (
                  <div key={product._id}>
                    <ProductCard
                      image={product.banner_image}
                      price={product.price}
                      name={product.name}
                      discountedPrice={discountPrice}
                      smallDescription={product.small_description}
                      id={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      selectedId={selectedId}
                      onAddToCart={() => handleAddToCart(product)}
                      isProductAdd={isPending}
                    />
                  </div>
                );
              })}
            </AnimationSlider>
          ) : (
            <ProductEmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;
