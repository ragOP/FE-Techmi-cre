import { Share2 } from "lucide-react";
import morning from "../../../assets/single_product/morning.png";
import afternoon from "../../../assets/single_product/afternoon.png";
import night from "../../../assets/single_product/night.png";
import { convertDate } from "../../../utils/date_time";
import { calculateDiscountPercentage } from "../../../utils/percentage/calculateDiscountPercentage";
import { getDiscountBasedOnRole } from "../../../utils/products/getDiscountBasedOnRole";
import { getItem } from "../../../utils/local_storage";
import { useEffect, useState } from "react";

const ProductDescription = ({ product }) => {
  const price = product?.price;
  const discountedPrice = product?.discounted_price || price;
  const localStorageRole = getItem("role");
  const [modifiedPrice, setModifiedPrice] = useState(0);
  const [modidifedDiscount, setModifiedDiscount] = useState(0);

  useEffect(() => {
    if (!product) return;

    const discountPrice = getDiscountBasedOnRole({
      role: localStorageRole,
      discounted_price: product?.discounted_price,
      salesperson_discounted_price: product?.salesperson_discounted_price,
      dnd_discounted_price: product?.dnd_discounted_price,
    });
    setModifiedPrice(discountPrice);

    const discountPercentage = calculateDiscountPercentage(
      product?.price,
      discountPrice
    );
    setModifiedDiscount(discountPercentage)
  }, [product, localStorageRole]);
  
  return (
    <div className="w-full lg:w-[40%]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {product?.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 border-b pb-2 border-gray-[#D1E3E9]">
            {product?.full_description}
          </p>
        </div>
        <button>
          <Share2 className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="mt-4 flex items-center">
        <span className="text-green-600 text-2xl font-bold">
          ₹{modifiedPrice || product?.price}
        </span>
        {product?.discounted_price && (
          <span className="text-gray-500 text-normal line-through ml-2">
            ₹{product?.price}
          </span>
        )}
        {product?.discounted_price && (
          <p className="text-xs text-orange-600 ml-2 ">
            ( {modidifedDiscount}% OFF )
          </p>
        )}
      </div>

      <div className="mt-2 flex gap-2 text-sm">
        <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded-md">
          Free <span className="text-gray-900">Delivery</span>
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded-md">
          50% OFF <span className="text-gray-900">on SFD Card</span>
        </span>
      </div>

      <div className="flex gap-4 mt-4 border-b border-dashed border-gray-500 pb-4">
        {[
          {
            weight: "340 gm",
            price: "₹1500",
            perGram: "₹4.41",
            status: "In Stock",
            statusColor: "text-green-600",
          },
          {
            weight: "454 gm",
            price: "₹1800",
            perGram: "₹3.96",
            status: "Out of Stock",
            statusColor: "text-red-600",
          },
          {
            weight: "340 gm",
            price: "₹1500",
            perGram: "₹4.41",
            status: "Only 2 Left",
            statusColor: "text-yellow-600",
          },
          {
            weight: "340 gm",
            price: "₹1500",
            perGram: "₹4.41",
            status: "In Stock",
            statusColor: "text-green-600",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`${
              item.status === "Out of Stock"
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } border p-2 rounded-3xl shadow-sm text-center bg-gray-50`}
          >
            <p className="text-sm font-medium border-b pb-2">{item.weight}</p>
            <p className="text-lg font-semibold">{item.price}</p>
            <p className="text-xs text-gray-500">({item.perGram} / 1 gm)</p>
            <p className={`text-sm font-medium ${item.statusColor}`}>
              {item.status}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Medicine Dosage</h3>
          <p className="text-sm text-blue-800 cursor-pointer"> View More</p>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <div>
            <p className="text-gray-600">
              <img
                src={morning}
                alt="Morning"
                className="w-6 h-6 inline-block mr-1"
              />
              Before Breakfast
            </p>
            <p className="font-bold ml-5">09:00 AM</p>
          </div>
          <div>
            <p className="text-gray-600">
              <img
                src={afternoon}
                alt="Afternoon"
                className="w-6 h-6 inline-block mr-1"
              />
              After Lunch
            </p>
            <p className="font-bold ml-5">02:02 PM</p>
          </div>
          <div>
            <p className="text-gray-600">
              <img
                src={night}
                alt="Night"
                className="w-6 h-6 inline-block mr-1"
              />
              After Dinner
            </p>
            <p className="font-bold ml-5">09:08 PM</p>
          </div>
        </div>
        <p className="text-xs mt-2 text-gray-500 cursor-pointer">
          In detail description of dosage
        </p>
      </div>

      <div className="mt-6 text-sm text-gray-800">
        <div className="flex justify-between py-1">
          <span className="font-semibold text-gray-700">
            Manufacturer/Marketer:
          </span>
          <span className="text-gray-900">{product?.manufacturer}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold text-gray-700">Consume Type:</span>
          <span className="text-gray-900">{product?.consumed_type}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold text-gray-700">Return Policy:</span>
          <span className="text-blue-600">3 Days Returnable</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-semibold text-gray-700">
            Expires on or after:
          </span>
          <span className="text-gray-900">
            {convertDate(product?.expiry_date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
