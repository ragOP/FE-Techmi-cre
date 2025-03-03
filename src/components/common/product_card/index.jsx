// import React from "react";
// import Image from "../image";
// import { calculateDiscountPercentage } from "../../../utils/percentage/calculateDiscountPercentage";
// import Rating from "../../rating";

// const ProductCard = ({
//   image,
//   price,
//   discountedPrice,
//   name,
//   smallDescription,
//   rating,
//   onClick,
//   onAddToCart,
//   showAddToCart = true,
// }) => {
//   const discountPercentage = calculateDiscountPercentage(price, discountedPrice);

//   return (
//     <div
//       onClick={onClick && onClick}
//       className="shadow-lg mb-5 lg:h-[30rem] h-[30rem] xl:h-[40rem] rounded-2xl p-6 max-h-fit relative cursor-pointer transition-transform transform hover:scale-105"
//     >
//       <Image
//         src={image}
//         alt={name}
//         css="rounded-2xl h-[35%] w-full object-cover"
//       />
//       <p className="text-[#191919] mt-4 font-semibold text-lg truncate" style={{ maxWidth: '75%' }}>
//         {name}
//       </p>
//       <p className="text-gray-500 mt-1 text-sm line-clamp-2">
//         {smallDescription}
//       </p>

//       <div className="mt-4 flex flex-row gap-3 items-center">
//         <p className="text-[#000] font-semibold text-lg">
//           ₹{discountedPrice || 0}
//           <span className="text-gray-400 line-through text-sm ml-2">₹{price || 0}</span>
//         </p>
//         {discountedPrice && (
//           <p className="text-xs text-orange-600 mt-1">
//             ({discountPercentage}% OFF)
//           </p>
//         )}
//       </div>

//       <Rating rating={4} />

//       {showAddToCart && (
//         <button
//           onClick={onAddToCart && onAddToCart}
//           className="mt-4 py-2 px-4 rounded-3xl w-full font-semibold border border-[#00008B] text-blue-500 hover:bg-blue-50 transition-colors"
//         >
//           Add to cart
//         </button>
//       )}
//     </div>
//   );
// };

// export default ProductCard;

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

const ProductCard = ({
  image,
  price,
  discountedPrice,
  name,
  smallDescription,
  id,
  rating = 4.5,
  reviewsCount = 250,
  stock = 5, // If stock <= 5, show "Hurry, only X left!"
  seller = "Official Store",
  fastDelivery = true,
  emiAvailable = true,
  variants = ["Red", "Blue", "Black"],
  returnPolicy = "7-day return",
  onClick,
  onAddToCart,
  onBuyNow,
  showAddToCart = true,
  showBuyNow = true,
  showWishlist = false,
  isProductAdd = false,
  selectedId = null,
}) => {
  const navigate = useNavigate();
  console.log(">>>>", id);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const discount = price
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;
  const activeUsers = Math.floor(Math.random() * 300) + 50; // Random viewers count

  return (
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

      {/* Live Viewers */}
      <div className="absolute top-12 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
        👀 {activeUsers} viewing now
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
          <p className="text-lg font-bold text-[#00008B]">₹{discountedPrice}</p>
          <p className="text-sm text-gray-500 line-through ml-2">₹{price}</p>
          <span className="text-xs bg-red-500 text-white px-2 py-1 ml-2 rounded">
            -{discount}%
          </span>
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
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow && onBuyNow();
              }}
              className="flex-1 bg-[#036bfc] text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
            >
              <FaBolt className="mr-1" /> Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
