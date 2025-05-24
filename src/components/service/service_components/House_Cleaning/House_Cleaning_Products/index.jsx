import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchProducts } from "../../../../home/featured_products/helper/fetchProducts";
import ProductCard from "../../../../common/product_card";
import { useNavigate } from "react-router";
import { getItem, setItem } from "../../../../../utils/local_storage";
import { fetchCart } from "../../../../../pages/cart/helper/fecthCart";
import LoadingSpinner from "../../../../loader/LoadingSpinner";
import { toast } from "react-toastify";
import { useState } from "react";
import { getDiscountBasedOnRole } from "../../../../../utils/products/getDiscountBasedOnRole";
import AnimationSlider from "../../../../common/animations";
import ProductEmptyState from "../../../../empty_state/ProductEmptyState";

const HouseCleaningProducts = ({ category }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const localStorageRole = getItem("role");

  const name = category?.name;
  const id = category?._id;

  const params = {
    category_id: id,
    page: 1,
    per_page: 10,
  };

  const {
    data: houseCleaningProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top_products", id],
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

    if (product.inventory < 1) {
      toast.error('Item is out of stock');
    return;
  }

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
            <AnimationSlider>
              {houseCleaningProducts.map((product) => {
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

export default HouseCleaningProducts;
