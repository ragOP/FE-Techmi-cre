import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../common/product_card";
import SearchBar from "../../common/Search_Bar";
import Filter from "../filter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../home/featured_products/helper/fetchProducts";
import { isArrayWithValues } from "../../../utils/array/isArrayWithValues";
import { fetchCategories } from "../../home/Categ_Options/helpers/fetchCategories";
import LoadingSpinner from "../../loader/LoadingSpinner";
import { fetchCart } from "../../../pages/cart/helper/fecthCart";
import { toast } from "react-toastify";
import { getItem } from "../../../utils/local_storage";

const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedServiceId = location.state?.selectedCardId || null;
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";
  const categoryId = location.state.categoryId || null;

  const [filters, setFilters] = useState({
    page: 1,
    per_page: 20,
    category_id: [],
    // brand: [],
    price_range: [],
    discount: [],
  });
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search_result_products", params],
    queryFn: () => fetchProducts({ params }),
  });

  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: ({ payload }) =>
      fetchCart({
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      toast.success("Product added to cart!");
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
        ) : isArrayWithValues(allProducts) ? (
          <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 ">
            {allProducts?.map((product) => (
              <ProductCard
                key={product?._id}
                image={product.banner_image}
                price={product.price}
                name={product.name}
                id={product._id}
                discountedPrice={product.discounted_price}
                smallDescription={product.small_description}
                onClick={() => onNavigateToProduct(product)}
                selectedId={selectedId}
                onAddToCart={() => handleAddToCart(product)}
                isProductAdd={isPending}
              />
            ))}
          </div>
        ) : !isLoading && !isArrayWithValues(allProducts) ? (
          <div className="flex align-center justify-center mt-10">
            <p className="text-center text-gray-500">No products found.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResult;
