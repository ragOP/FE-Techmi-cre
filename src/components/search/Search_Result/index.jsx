import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../common/product_card";
import SearchBar from "../../common/Search_Bar";
import Filter from "../filter";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchProducts } from "../../home/featured_products/helper/fetchProducts";
import { isArrayWithValues } from "../../../utils/array/isArrayWithValues";
import { fetchCategories } from "../../home/Categ_Options/helpers/fetchCategories";
import LoadingSpinner from "../../loader/LoadingSpinner";
import { fetchCart } from "../../../pages/cart/helper/fecthCart";
import { toast } from "react-toastify";
import { getItem, setItem } from "../../../utils/local_storage";
import { getDiscountBasedOnRole } from "../../../utils/products/getDiscountBasedOnRole";
import ProductEmptyState from "../../empty_state/ProductEmptyState";
import { useInfiniteQuery } from "@tanstack/react-query";

const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedServiceId = location.state?.selectedCardId || null;
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";
  const categoryId = location?.state?.categoryId || null;

  const [filters, setFilters] = useState({
    page: 1,
    per_page: 5,
    category_id: [],
    // brand: [],
    price_range: [],
    discount: [],
  });
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const localStorageRole = getItem("role");

  const categoriesParams = {
    service_id: selectedServiceId,
  };
  const { data: categoriesList } = useQuery({
    queryKey: ["pharma_categories", categoriesParams],
    queryFn: () => fetchCategories({ params: categoriesParams }),
  });

  const onNavigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
  };

  const params = {
    ...(filters || {}),
    search: debouncedQuery || "",
    category_id: !isArrayWithValues(filters.category_id)
      ? categoriesList?.map((it) => it?._id)
      : filters.category_id,
  };

  const {
    data: allProductsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["search_result_products", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ params: { ...params, page: pageParam } }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === filters.per_page) {
        return allPages.length + 1;
      }
      return undefined;
    },
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
      toast.error("Item is out of stock");
      return;
    }

    addToCartMutation({ payload });
  };

  useEffect(() => {
    if (categoryId) {
      const currentCategory = categoriesList?.find(
        (category) => category._id === categoryId
      );
      setFilters({
        ...filters,
        category_id: [currentCategory?._id],
      });
    }
  }, [categoryId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomReached && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex mt-5">
      <Filter
        filters={filters}
        setFilters={setFilters}
        categoriesList={categoriesList}
      />
      <div className="flex-grow w-[80%] rounded-3xl bg-white px-4 mx-5 ">
        <SearchBar
          debouncedQuery={debouncedQuery}
          setDebouncedQuery={setDebouncedQuery}
        />
        {isLoading ? (
          <LoadingSpinner />
        ) : allProductsPages?.pages?.flat().length > 0 ? (
          <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 ">
            {allProductsPages.pages.flat().map((product) => {
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
                    inventory={product.inventory}
                    smallDescription={product.small_description}
                    id={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    selectedId={selectedId}
                    onAddToCart={() => handleAddToCart(product)}
                    isProductAdd={isPending}
                    hsnCode={product?.hsn_code}
                  />
                </div>
              );
            })}
            {isFetchingNextPage && <LoadingSpinner />}
          </div>
        ) : (
          <ProductEmptyState />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
