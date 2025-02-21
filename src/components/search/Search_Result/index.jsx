import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../common/product_card";
import SearchBar from "../../common/Search_Bar";
import Filter from "../filter";

const SearchResult = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: [],
    discount: [],
  });

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    const dummyProducts = [
      { id: 1, category: "Pain Relief", brand: "Mama Earth", price: 259, originalPrice: 599, discount: "10%", img: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592", title: "Pain Relief Tablets", desc: "Effective pain relief." },
      { id: 2, category: "Vitamins", brand: "Cetaphile", price: 499, originalPrice: 799, discount: "25%", img: "https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Vitamin C Gummies", desc: "Boosts immunity and overall health." },
      { id: 3, category: "Tea", brand: "Himalaya", price: 349, originalPrice: 699, discount: "35%", img: "https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Herbal Green Tea", desc: "Rich in antioxidants for a healthy body." },
      { id: 4, category: "Skincare", brand: "Biotique", price: 599, originalPrice: 999, discount: "40%", img: "https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Aloe Vera Face Cream", desc: "Hydrates and nourishes your skin." },
      { id: 5, category: "Haircare", brand: "Nivea", price: 299, originalPrice: 499, discount: "20%", img: "https://plus.unsplash.com/premium_photo-1738857914575-3d3b2fb7064e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Anti-Dandruff Shampoo", desc: "Removes dandruff and keeps scalp healthy." },
    ];

    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) => filters.category.includes(product.category));
    }

    if (filters.brand.length > 0) {
      filtered = filtered.filter((product) => filters.brand.includes(product.brand));
    }

    if (filters.price.length > 0) {
      filtered = filtered?.filter((product) => {
        return filters?.price?.some((range) => {
          if (range === "₹0 - ₹500") return product.price >= 0 && product.price <= 500;
          if (range === "₹500 - ₹1K") return product.price > 500 && product.price <= 1000;
          if (range === "ABOVE ₹1K") return product.price > 1000;
          return false;
        });
      });
    }

    if (filters.discount.length > 0) {
      filtered = filtered?.filter((product) => {
        return filters?.discount?.some((discount) => {
          const discountValue = parseInt(product?.discount?.replace("%", ""));
          if (discount === "10% Off or more") return discountValue >= 10;
          if (discount === "25% Off or more") return discountValue >= 25;
          if (discount === "35% Off or more") return discountValue >= 35;
          return false;
        });
      });
    }

    setFilteredProducts(filtered.length > 0 ? filtered : products);
  };

  return (
    <div className="flex mt-5">
      <Filter filters={filters} setFilters={setFilters} />
      <div className="flex-grow rounded-3xl bg-white px-4 mx-5 ">
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-x-4 ">
          {filteredProducts?.map((product) => (
            <ProductCard key={product?.id} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
