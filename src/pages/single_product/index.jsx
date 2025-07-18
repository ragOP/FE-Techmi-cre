import React, { useEffect, useState } from "react";
import CartAlternativeProduct from "../../components/cart/Cart_Alternative_Product";
import ImageGallery from "../../components/single_product/Image_Gallery";
import ProductDescription from "../../components/single_product/Product_Description";
import ProductAddToCart from "../../components/single_product/Add_To_Cart";
import ProductInfo from "../../components/single_product/Product_Information";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchSingleProduct } from "./helper";
import { fetchCart } from "../cart/helper/fecthCart";
import { getItem, setItem } from "../../utils/local_storage";
import { toast } from "react-toastify";
import ReviewSlider from "../../components/review";
import { fetchReviews } from "../../components/review/helper";
import ReviewModal from "../../components/review_modal";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { data: productData } = useQuery({
    queryKey: ["productData", id],
    queryFn: () => fetchSingleProduct({ id }),
  });

  const { data: cartData } = useQuery({
    queryKey: ["cartData"],
    queryFn: () => fetchCart(),
  });


  const queryClient = useQueryClient();
  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: () =>
      fetchCart({
        method: "POST",
        body: {
          user_id: getItem("userId"),
          product_id: id,
          quantity: quantity,
        },
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

    if (productData.inventory < Number(quantity)) {
      if(productData.inventory > 0) {
        toast.error(`Only ${productData.inventory} items available in stock`);
      } else {
        toast.error("Out of stock");
      }
      return;
    }
      
    addToCartMutation();
  };

  const handleOpenReview = () => {
    setIsOpen(true);
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
        <div className="flex flex-col lg:flex lg:flex-row gap-6">
          <ImageGallery product={product} />
          <ProductDescription product={product} />
          <ProductAddToCart
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            isAddingToCart={isPending}
          />
        </div>
      </div>
      <CartAlternativeProduct />
      <ProductInfo />
      <CartAlternativeProduct />
      <ReviewSlider id={id} handleOpenReview={handleOpenReview} />
      <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </div>
  );
}
