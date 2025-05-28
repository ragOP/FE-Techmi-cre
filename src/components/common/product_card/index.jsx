import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaTruck,
  FaShoppingCart,
  FaBolt,
  FaTags,
  FaShareAlt,
  FaSyncAlt,
} from "react-icons/fa";
import Image from "../image";
import CartLoader from "../../loader/CartLoader";
import BuyNowModal from "../buy_now_modal";
import { toast } from "react-toastify";
import { getItem } from "../../../utils/local_storage";
import InventoryStatus from "../../single_product/Product_Information/InventoryStatus"

const ProductCard = ({
  image,
  price,
  discountedPrice,
  name,
  smallDescription,
  inventory,
  id,
  rating = 4.5,
  reviewsCount = 250,
  stock = 5,
  seller = "Official Store",
  fastDelivery = true,
  emiAvailable = true,
  variants = ["Red", "Blue", "Black"],
  returnPolicy = "7-day return",
  onClick,
  onAddToCart,
  showAddToCart = true,
  showBuyNow = true,
  showWishlist = false,
  isProductAdd = false,
  selectedId = null,
  hsnCode,
  isPrescriptionRequired
}) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  
  const discount = discountedPrice
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;
  const activeUsers = Math.floor(Math.random() * 300) + 50;

  // console.log(discount, price)

  const finalPrice = discountedPrice ? discountedPrice : price;

  const handleBuyNowClick = (e) => {
    e.stopPropagation();
    const token = getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (!inventory || inventory <= 0) {
      toast.error("Product is out of stock!");
      return;
    }

    setShowBuyNowModal(true);
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
        className="relative bg-white shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer p-4 border border-gray-200"
      >
        {/* Wishlist Button */}
        {showWishlist && (
          <div
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </div>
        )}

        {/* Badges */}
        {discount > 20 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Bestseller 🏆
          </div>
        )}
        {stock < 5 && (
          <div className="absolute top-3 left-20 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Limited Stock ⏳
          </div>
        )}

        {/* Live Viewers
        <div className="absolute top-12 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
          👀 {activeUsers} viewing now
        </div> */}

        <div className="absolute top-3 right-3 z-10">
        <InventoryStatus quantity={inventory} />
        </div>

        {/* Product Image */}
        <div className="relative h-56 w-full flex justify-center items-center">
          <Image
            src={image}
            alt={name}
            css="object-cover w-full h-full transition-all duration-300 hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-gray-600 text-sm">
            {smallDescription?.slice(0, 50)}...
          </p>

          {/* Price & Discount */}
          <div className="flex items-center mt-2">
            <p className="text-lg font-bold text-[#00008B]">₹{finalPrice}</p>
            <p className="text-sm text-gray-500 line-through ml-2">₹{price}</p>
            {discount > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 ml-2 rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Ratings */}
          <div className="flex items-center mt-1">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({reviewsCount} reviews) ✅ Verified Buyers
            </span>
          </div>

          {/* Variants */}
          <div className="mt-2 flex space-x-2">
            {variants.map((variant, i) => (
              <button
                key={i}
                className={`px-3 py-1 border rounded-lg text-xs ${
                  selectedVariant === variant
                    ? "border-[#00008B] bg-[#00008B] text-white"
                    : "border-gray-300"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(variant);
                }}
              >
                {variant}
              </button>
            ))}
          </div>

          {/* Stock Meter */}
          {stock < 5 && (
            <p className="text-sm text-red-600 mt-1">
              Hurry, only {stock} left in stock!
            </p>
          )}

          {/* Delivery & Return */}
          <p className="text-sm text-gray-600 mt-2">
            <FaTruck className="inline-block mr-1" /> Delivery in 2-4 days |{" "}
            {fastDelivery ? "🚀 Fast Delivery" : "Standard Shipping"}
          </p>
          <p className="text-sm text-gray-500">
            <FaSyncAlt className="inline-block mr-1" /> {returnPolicy} Return
            Policy
          </p>

          {/* Social Share */}
          <div className="flex mt-2 space-x-3">
            <button className="text-gray-500 text-xs flex items-center">
              <FaShareAlt className="mr-1" /> Share
            </button>
            <button className="text-gray-500 text-xs flex items-center">
              <FaTags className="mr-1" /> Apply Coupon
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex mt-3 space-x-2">
            {showAddToCart && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart && onAddToCart();
                }}
                className="flex-1 bg-[#6603fc] text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
              >
                {isProductAdd && id === selectedId ? (
                  <div>
                    <CartLoader />
                  </div>
                ) : (
                  <>
                    <FaShoppingCart className="mr-1" /> <span> Add to Cart</span>
                  </>
                )}
              </button>
            )}

            {showBuyNow && (
              <button
                onClick={handleBuyNowClick}
                className="flex-1 bg-[#036bfc] text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
              >
                <FaBolt className="mr-1" /> Buy Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <BuyNowModal
        isOpen={showBuyNowModal}
        onClose={() => setShowBuyNowModal(false)}
        product={{
          _id: id,
          name,
          small_description: smallDescription,
          banner_image: image,
          price,
          discounted_price: discountedPrice,
          inventory,
          hsn_code: hsnCode,
          is_prescription_required: isPrescriptionRequired
        }}
      />
    </>
  );
};

export default ProductCard;
