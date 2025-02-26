import React, { useEffect, useState } from "react";
import CartAlternativeProduct from "../../components/cart/Cart_Alternative_Product";
import ImageGallery from "../../components/single_product/Image_Gallery";
import ProductDescription from "../../components/single_product/Product_Description";
import ProductAddToCart from "../../components/single_product/Add_To_Cart";
import ProductInfo from "../../components/single_product/Product_Information";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchSingleProduct } from "./helper";
import { fetchCart } from "../cart/helper/fecthCart";
import { getItem } from "../../utils/local_storage";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { data: productData } = useQuery({
    queryKey: ["productData", id],
    queryFn: () => fetchSingleProduct({ id }),
  });

  const { data: cartData } = useQuery({
    queryKey: ["cartData"],
    queryFn: () => fetchCart(),
  });

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: () => fetchCart({
      method: "POST",
      body: {
        user_id: getItem("userId"),
        product_id: id,
        quantity: quantity,
      },
    }),
    onSuccess: () => {
      navigate("/cart");
    },
  });

  const handleAddToCart = () => {
    addToCartMutation();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (productData) {
      setProduct(productData);
      scrollToTop();
    }
  }, [productData]);

  return (
    <div className="bg-gray-100 min-h-screen w-[98.5vw] m-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex gap-6">
          <ImageGallery product={product} />
          <ProductDescription product={product} />
          <ProductAddToCart
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
      <CartAlternativeProduct />
      <ProductInfo />
      <CartAlternativeProduct />
    </div>
  );
}
