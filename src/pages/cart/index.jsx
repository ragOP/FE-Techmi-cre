import { ChevronRight, MapPinIcon, TicketPercentIcon } from "lucide-react";
import { useEffect, useState } from "react";
import LastMinuteBuy from "../../components/cart/Cart_Last_Minute_Buy";
import CartAlternativeProduct from "../../components/cart/Cart_Alternative_Product";
import { Link } from "react-router-dom";
import { fetchCart } from "./helper/fecthCart";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItem } from "../../utils/local_storage";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import CartLoader from "../../components/loader/CartLoader";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [shippingFee, setShippingFee] = useState(null);
  const [removeCart, setRemoveCart] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const params = {
    user_id: getItem("userId"),
  };

  const {
    data: cartProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart_products"],
    queryFn: () => fetchCart({ params }),
  });
  const queryClient = useQueryClient();
  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: (updatedCart) =>
      fetchCart({
        method: "POST",
        body: updatedCart,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart_products"]);
      setRemoveCart(false);
    },
  });

  const getDiscount = (products) => {
    const discount = products.reduce(
      (sum, item) =>
        sum +
        (item.product.price - item.product.discounted_price) * item.quantity,
      0
    );
    setDiscount(discount);
  };

  useEffect(() => {
    if (cartProducts) {
      setCart(cartProducts);
      getDiscount(cartProducts);
    }
  }, [cartProducts]);

  const updateQuantity = (product, change) => {
    setSelectedId(product._id);
    const productId = product?._id;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    const updatedItem = cartProducts.find(
      (item) => item.product._id === productId
    );
    if (updatedItem) {
      updateCart({
        user_id: getItem("userId"),
        product_id: updatedItem.product._id,
        quantity: updatedItem.quantity + change,
      });
    }
  };
  const handleRemoveItemFromCart = (productId) => {
    setSelectedId(productId);
    setRemoveCart(true);
    updateCart({
      user_id: getItem("userId"),
      product_id: productId,
      quantity: 0,
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const platformFee = 0;
  const finalPrice = totalPrice - discount + platformFee;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-6 min-h-screen rounded-3xl shadow bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 bg-white p-6 pr-1 rounded-tl-3xl rounded-bl-3xl">
          <h2 className="text-2xl ml-4 font-bold">{cart.length} items added</h2>
          {cart.length === 0 && (
            <p className="text-lg ml-4 text-gray-500 mb-4">
              Your cart is empty
            </p>
          )}
          {isLoading && <LoadingSpinner />}
          {/* {cart.length > 0 && (
            <p className="text-sm ml-4 text-gray-500 mb-2">
              Items not requiring prescription
            </p>
          )} */}
          <div className="mt-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex lg:flex-row items-start justify-start lg:items-center lg:justify-between p-4 mb-4 border-b border-gray-200 bg-gray-50"
              >
                <div className="flex flex-col lg:flex-row lg:items-center sm:w-[70%] w-auto">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-36 h-36 lg:w-28 lg:h-28 object-cover rounded"
                  />
                  <div className="ml-0 mt-4 lg:ml-4 mr-4 w-[170%] lg:w-[65%]">
                    <h3 className="font-semibold text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product.full_description || "No description"}
                    </p>
                    {removeCart && item.product._id === selectedId ? (
                      <div className="w-fit mt-2">
                        <CartLoader />
                      </div>
                    ) : (
                      <span
                        onClick={() =>
                          handleRemoveItemFromCart(item.product._id)
                        }
                        className="text-[#4D4D4D] text-xs mt-2 border-b border-[#4D4D4D] cursor-pointer"
                      >
                        Remove
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center flex-col mt-8 lg:-mt-8 sm:w-[30%] w-auto">
                  <p className="font-bold text-lg ">
                    ₹
                    {item.product.discounted_price
                      ? item.product.discounted_price
                      : item.product.price}{" "}
                    {item.product.discounted_price && (
                      <span className="line-through text-gray-500 text-xs">
                        ₹{item.product.price}
                      </span>
                    )}
                    {/* <span className="text-[#297C00] text-sm">
                    {item.product.discount || 0}% off
                  </span> */}
                  </p>
                  <div className="flex items-center justify-center mt-2 rounded-3xl border-blue-900 w-28 border-2">
                    <button
                      disabled={isPending}
                      onClick={() => updateQuantity(item.product, -1)}
                      className="text-3xl pb-1"
                    >
                      -
                    </button>
                    {isPending &&
                    !removeCart &&
                    item.product._id === selectedId ? (
                      <div className="mx-2">
                        <CartLoader />
                      </div>
                    ) : (
                      <span className="mx-3 font-medium">{item.quantity}</span>
                    )}
                    <button
                      disabled={isPending}
                      onClick={() => updateQuantity(item.product, 1)}
                      className="text-2xl pb-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {cart.length > 0 && (
          <div className="w-full md:w-1/3 bg-white p-6 rounded-tr-3xl rounded-br-3xl border-l border-gray-200">
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
              Item Total (MRP) <span>₹{Number(totalPrice).toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-4 text-gray-600">
              Platform Fee <span>₹{platformFee}</span>
            </p>
            <p className="flex justify-between mb-4 text-[#297C00] font-medium">
              Total Discount <span>-₹{Number(discount).toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-4 text-[#297C00] font-medium">
              Shipping Fees{" "}
              <span>
                {shippingFee ? `₹${shippingFee}` : "As per delivery address"}
              </span>
            </p>
            <hr className="border-dashed border-gray-900" />
            <p className="flex justify-between font-bold text-lg mt-2">
              To be paid <span>₹{Number(finalPrice).toFixed(2)}</span>
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
        )}
      </div>
      <LastMinuteBuy />
      <CartAlternativeProduct />
    </div>
  );
}
