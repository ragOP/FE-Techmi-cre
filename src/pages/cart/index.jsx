import { ChevronRight, MapPinIcon, TicketPercentIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "./helper/dummyData";
import LastMinuteBuy from "../../components/cart/Cart_Last_Minute_Buy";
import CartAlternativeProduct from "../../components/cart/Cart_Alternative_Product";
import { Link } from "react-router-dom";
import { fetchCart } from "./helper/fecthCart";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../../utils/local_storage";

export default function Cart() {
  const [cart, setCart] = useState(products);
  const [shippingFee, setShippingFee] = useState(null);

  const params = {
    user_id: getItem("userId"),
  }

  const { data: cartProducts, isLoading, error } = useQuery({
    queryKey: ['cart_products'],
    queryFn: () => fetchCart({ params }),
  })

  console.log(">>>", cartProducts)

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 224;
  const platformFee = 4;
  const finalPrice = totalPrice - discount + platformFee;

  return (
    <div className="m-6 min-h-screen rounded-3xl shadow bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-white p-6 pr-1 rounded-tl-3xl rounded-bl-3xl">
          <h2 className="text-2xl ml-4 font-bold">5 items added</h2>
          <p className="text-sm ml-4 text-gray-500 mb-2">
            Items not requiring prescription
          </p>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 mb-4 border-b border-gray-200 bg-gray-50"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded"
              />
              <div className="ml-4 mr-4 w-[65%]">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <span className="text-[#4D4D4D] text-xs mt-2 border-b border-[#4D4D4D] cursor-pointer">
                  Remove
                </span>
              </div>
              <div className="flex items-center flex-col -mt-8">
                <p className="font-bold text-lg ">
                  ₹{item.price}{" "}
                  <span className="line-through text-gray-500 text-xs">
                    ₹{item.price + item.discount}
                  </span>{" "}
                  <span className="text-[#297C00] text-sm">
                    {item.discount}% off
                  </span>
                </p>
                <div className="flex items-center justify-center mt-2 rounded-3xl border-blue-900 w-28 border-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-3xl"
                  >
                    -
                  </button>
                  <span className="mx-3 font-medium mt-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3 bg-white p-6 rounded-tr-3xl rounded-br-3xl border-l border-gray-600">
          <h3 className="text-xl font-bold mb-4">Offers & Discounts</h3>
          <div className="border-b border-gray-900 p-3 text-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TicketPercentIcon className="w-6 h-6" />
                <span className="text-xl font-medium">Apply coupon</span>
              </div>
              <ChevronRight className="w-6 h-6" />
            </div>
            <button className="text-[#C62828] text-sm ml-10">
              <Link to="/login">Login to apply coupons</Link>
            </button>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-4">Bill Summary</h3>
          <p className="flex justify-between mb-4 text-gray-600">
            Item Total (MRP) <span>₹{totalPrice}</span>
          </p>
          <p className="flex justify-between mb-4 text-gray-600">
            Platform Fee <span>₹{platformFee}</span>
          </p>
          <p className="flex justify-between mb-4 text-[#297C00] font-medium">
            Total Discount <span>-₹{discount}</span>
          </p>
          <p className="flex justify-between mb-4 text-[#297C00] font-medium">
            Shipping Fees{" "}
            <span>
              {shippingFee ? `₹${shippingFee}` : "As per delivery address"}
            </span>
          </p>
          <hr className="border-dashed border-gray-900" />
          <p className="flex justify-between font-bold text-lg mt-2">
            To be paid <span>₹{finalPrice}</span>
          </p>
          <div className="mt-2 border-t border-gray-900">
            <h3 className="text-lg font-bold mt-2 mb-2">Delivering to</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                <p className="text-gray-600 text-sm">
                  Add your current address
                </p>
              </div>
              <button className="text-[#C62828] font-medium mt-2">
                Add Address
              </button>
            </div>
          </div>

          <button className="w-full mt-6 bg-[#00008B] text-white py-3 rounded-3xl text-lg font-medium">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <LastMinuteBuy />
      <CartAlternativeProduct />
    </div>
  );
}
