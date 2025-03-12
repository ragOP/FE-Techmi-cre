import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnimationSlider from "../../../../common/animations";
import ProductCard from "../../../../common/product_card";
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";
import { useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../../../../loader/LoadingSpinner";
import { fetchCart } from "../../../../../pages/cart/helper/fecthCart";
import { toast } from "react-toastify";
import { getItem, setItem } from "../../../../../utils/local_storage";
import { useState } from "react";
import { getDiscountBasedOnRole } from "../../../../../utils/products/getDiscountBasedOnRole";

export const PharmaSearchProducts = ({ debouncedQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedServiceId = location.state?.selectedCardId || null;

  const [selectedId, setSelectedId] = useState(null);
  const localStorageRole = getItem("role");

  const params = {
    search: debouncedQuery,
    service_id: selectedServiceId,
  };

  const {
    data: searchedProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search_products", params],
    queryFn: () => fetchProducts({ params }),
    enabled: debouncedQuery?.trim() !== "",
  });

  const onNavigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
  };


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
      {debouncedQuery?.trim() !== "" && (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {searchedProducts && searchedProducts.length > 0 ? (
              <AnimationSlider>
                {searchedProducts.map((product) => {
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
                <div className="text-center text-gray-500">
                  No products found.
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
