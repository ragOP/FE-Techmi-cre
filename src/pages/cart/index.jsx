import {
  ChevronRight,
  CrossIcon,
  MapPinIcon,
  Ticket,
  TicketPercentIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import LastMinuteBuy from "../../components/cart/Cart_Last_Minute_Buy";
import CartAlternativeProduct from "../../components/cart/Cart_Alternative_Product";
import { Link } from "react-router-dom";
import { fetchCart } from "./helper/fecthCart";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import CartLoader from "../../components/loader/CartLoader";
import Lottie from "lottie-react";
import emptyCartAnimation from "../../assets/EmptyCartAnimation.json";
import AddressDialog from "./components/AddressDialog";
import { getItem } from "../../utils/local_storage";
import CouponDialog from "./components/CouponDialog";
import { toast } from "react-toastify";
import { placeOrder } from "./helper/order";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [shippingFee, setShippingFee] = useState(null);
  const [removeCart, setRemoveCart] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const params = {
    user_id: getItem("userId"),
  };
  const [openAddress, setOpenAddress] = useState(false);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [discountCoupon, setDiscountCoupon] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [platformFee, setPlatFormFee] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [address, setAddress] = useState({});

  const onOpenAddressDialog = () => setOpenAddress(true);
  const onCloseAddressDialog = () => setOpenAddress(false);
  const onOpenCouponDialog = () => setOpenCoupon(true);
  const onCloseCouponDialog = () => setOpenCoupon(false);

  const { data: cartProducts, isLoading } = useQuery({
    queryKey: ["cart_products"],
    queryFn: () => fetchCart({ params }),
  });

  const { mutate: placeOrderMutation, isPending: isPlacingOrder } = useMutation({
    mutationFn: (payload) => placeOrder({payload}),
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["cart_products"] });
      setDiscountCoupon([]);
      scrollToTop();
    },
    onError: (error) => {
      toast.error(error.message || "Order failed, please try again later");
    }
  });
  
  const handlePlaceOrder = async () => {
    const payload = {
      cartId: cartProducts?._id,
      addressId: address?._id,
      couponId: discountCoupon?.[0]?._id || null
    };
  
    if (!payload.cartId || !payload.addressId) {
      toast.error("Please select an address");
      return;
    }  
    placeOrderMutation(payload);
  };  

  const queryClient = useQueryClient();
  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: (updatedCart) =>
      fetchCart({
        method: "POST",
        body: updatedCart,
      }),
    onSuccess: (_, variables) => {
      if (variables.quantity === 0) {
        setCart((prevCart) =>
          prevCart.filter(
            (item) =>
              item.product?._id.toString() !== variables.product_id?.toString()
          )
        );
      }
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
    if (cartProducts?.items) {
      setCart(cartProducts?.items);
      getDiscount(cartProducts?.items);
    }
  }, [cartProducts?.items]);

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
    const updatedItem = cartProducts?.items?.find(
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

  const handleRemoveCoupon = () => {
    setDiscountCoupon([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  useEffect(() => {
    if (!discountCoupon || Object.keys(discountCoupon).length === 0) {
      setFinalPrice(totalPrice - discount + platformFee);
      return;
    }
    const couponDiscountedPrice = Math.min(
      totalPrice * (discountCoupon[0]?.discountValue / 100),
      discountCoupon[0]?.maxDiscount || 0
    );
    setDiscountedPrice(couponDiscountedPrice);
    setFinalPrice(totalPrice - discount - couponDiscountedPrice + platformFee);
  }, [discountCoupon, cart]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  useEffect(() => {
    scrollToTop()
  }, []);

  return (
    <>
      <div className="m-6 min-h-screen rounded-3xl shadow bg-white">
        <div className="flex flex-col md:flex-row min-h-[45vh] border-b-2">
          <div className="flex-1 bg-white p-6 pr-1 rounded-tl-3xl rounded-bl-3xl">
            <h2 className="text-2xl ml-4 font-bold">
              {isLoading ? (
                <div className="h-4 w-[12em] bg-gray-200 rounded animate-pulse"></div>
              ) : !isLoading && cart.length > 0 ? (
                `${cart.length} items added`
              ) : null}
            </h2>{" "}
            {!isLoading && cart.length === 0 && (
              <div className="flex flex-col mt-[6rem] mb-[8rem] w-full h-64 items-center justify-center">
                <Lottie animationData={emptyCartAnimation} loop={true} />
                <p className="text-2xl font-semibold ml-4 text-black-500">
                  Your cart is empty
                </p>
                <button className="mt-4 bg-[#00008B] text-white py-3 rounded-3xl text-lg font-medium px-8 hover:bg-[#0000CC] hover:scale-105 transition-all duration-300 ease-in-out">
                  <Link to="/service">Shop now</Link>
                </button>
              </div>
            )}
            {isLoading && <LoadingSpinner />}
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
                        <span className="mx-3 font-medium">
                          {item.quantity}
                        </span>
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
              <div className="border-b border-gray-900 p-3 text-gray-800  hover:bg-slate-50 cursor-pointer">
                <div
                  onClick={onOpenCouponDialog}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <TicketPercentIcon className="w-6 h-6" />
                    <span className="text-xl font-medium">Apply coupon</span>
                  </div>
                  <ChevronRight className="w-6 h-6" />
                </div>
                {discountCoupon.length > 0 && (
                  <div className="flex items-center justify-between mt-3 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-green-600">
                      {discountCoupon[0]?.code} applied
                    </span>
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 transition"
                      aria-label="Remove Coupon"
                    >
                      <X
                        onClick={handleRemoveCoupon}
                        className="w-4 h-4 text-gray-500"
                      />
                    </button>
                  </div>
                )}
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

              {discountCoupon.length > 0 && (
                <p className="flex justify-between mb-4 text-[#297C00] font-medium">
                  Coupon Applied{" "}
                  <span>-₹{Number(discountedPrice).toFixed(2)}</span>
                </p>
              )}
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
                {address && Object.values(address).some((val) => val) && (
                  <div className="p-2 border border-gray-300 rounded-md bg-white shadow-sm max-w-md">
                    <p className="font-semibold text-gray-900">
                      {address.name},{address?.pincode}
                    </p>
                    <p className="text-gray-700">
                      Delivering to - {address.landmark}, {address.locality},{" "}
                      {address.address}, {address.city} - {address.mobile}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-6 h-6" />
                    <p className="text-gray-600 text-sm">
                      Add your current address
                    </p>
                  </div>
                  <button
                    onClick={onOpenAddressDialog}
                    className="text-[#C62828] font-medium mt-2 hover:underline"
                  >
                    Add Address
                  </button>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className={`${
                  isPlacingOrder ? "pointer-events-none" : ""
                } w-full mt-6 bg-[#00008B] text-white py-3 rounded-3xl text-lg font-medium`}
              >
                {isPlacingOrder ? <div className="my-1"><CartLoader /></div> : "Proceed to Checkout"}
              </button>
            </div>
          )}
        </div>
        <LastMinuteBuy />
        <CartAlternativeProduct />
      </div>

      {openAddress && (
        <AddressDialog onClose={onCloseAddressDialog} setAddress={setAddress} />
      )}
      {openCoupon && (
        <CouponDialog
          onClose={onCloseCouponDialog}
          appliedCoupons={discountCoupon}
          setAppliedCoupons={setDiscountCoupon}
        />
      )}
    </>
  );
}
