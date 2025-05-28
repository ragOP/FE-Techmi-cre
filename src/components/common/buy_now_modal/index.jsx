import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAddresses } from "../../../pages/cart/helper/getAddresses";
import { getItem } from "../../../utils/local_storage";
import { toast } from "react-toastify";
import { apiService } from "../../../utils/api/apiService";
import { endpoints } from "../../../utils/endpoints";
import CartLoader from "../../loader/CartLoader";
import { load } from "@cashfreepayments/cashfree-js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getTaxAmount } from "../../../pages/cart/helper/getTaxAmount";
import UserSelect from "../../user/UserSelect";
import { getDiscountBasedOnRole } from "../../../utils/products/getDiscountBasedOnRole";

const BuyNowModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const localStorageRole = getItem("role");

  const [selectedAddress, setSelectedAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [taxAmount, setTaxAmount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const discountedPrice = getDiscountBasedOnRole({
    role: localStorageRole,
    discounted_price: product.discounted_price,
    salesperson_discounted_price: product.salesperson_discounted_price,
    dnd_discounted_price: product.dnd_discounted_price,
    price: product.price,
  });

  const onSelectUser = (e) => {
    const selectedUserId = e.target.value;
    setSelectedUser(selectedUserId);
  };

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    }
  }, [orderId]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else if (!orderId) {
      document.body.style.overflow = "unset";
    }
    return () => {
      if (!orderId) {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, orderId]);

  useEffect(() => {
    if (product && selectedAddress) {
      const addressObj = addresses.find((addr) => addr._id === selectedAddress);
      if (addressObj) {
        // Wrap product in array to match getTaxAmount signature
        const tax = getTaxAmount(
          [
            {
              product,
              quantity,
            },
          ],
          0,
          addressObj
        );
        setTaxAmount(tax);
      }
    }
  }, [product, quantity, selectedAddress]);

  const handleClose = () => {
    if (orderId) {
      navigate(window.location.pathname, { replace: true });
    }
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ["user_addresses"],
    queryFn: () => getAddresses({ id: getItem("userId") }),
  });

  const { mutate: placeOrderMutation } = useMutation({
    mutationFn: async (payload) => {
      if (isPlacingOrder) {
        return null;
      }
      return await apiService({
        endpoint: endpoints.buyNow,
        method: "POST",
        data: payload,
      });
    },
    onSuccess: (data) => {
      if (!data) return;
      if (data?.response?.success) {
        toast.success("Order placed successfully!");
        handleClose();
      } else {
        toast.error(data?.response?.message || "Failed to place order");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  useEffect(() => {
    if (addresses?.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isPrimary);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else {
        setSelectedAddress(addresses[0]._id);
      }
    }
  }, [addresses]);

  // Create Payment Session
  const createPaymentSession = async () => {
    try {
      const apiResponse = await apiService({
        endpoint: endpoints.payment,
        method: "POST",
        data: {
          addressId: selectedAddress,
          couponId: null,
          amount: (
            Number(discountedPrice) * quantity +
            Number(taxAmount)
          ).toFixed(2),
          orderedForUser: getItem("userId"),
          orderType: "buyNow",
          productId: product._id,
          quantity: quantity,
        },
      });
      return apiResponse?.response?.data?.payment_session_id;
    } catch (error) {
      console.error("Error creating payment session:", error);
      toast.error("Failed to create payment session. Please try again.");
      return null;
    }
  };

  const handleBuyNow = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    if (quantity > product.inventory) {
      toast.error(`Only ${product.inventory} items available in stock`);
      return;
    }

    setIsPlacingOrder(true);

    try {
      const paymentSessionId = await createPaymentSession();

      if (!paymentSessionId) {
        setIsPlacingOrder(false);
        return;
      }

      const cashfree = await load({
        mode: "sandbox",
      });

      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self",
      };

      console.log("Initializing Cashfree with options:", checkoutOptions);
      await cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred during payment. Please try again.");
      setIsPlacingOrder(false);
    }
  };

  if (!isOpen && !orderId) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={orderId ? undefined : handleClose}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* Modal panel */}
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isAnimating
              ? "opacity-100 translate-y-0 sm:scale-100"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Buy Now</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Product Info */}
              <div className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={product.banner_image || product.images?.[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.small_description}
                  </p>
                  <p className="text-lg font-semibold mt-1 text-blue-600">
                    ₹{discountedPrice}
                    <span className="ml-2 text-gray-500 text-base line-through">
                      ₹{product.price}
                    </span>
                  </p>
                </div>
              </div>

              {/* Address Selection */}
              <div>
                {(localStorageRole === "dnd" ||
                  localStorageRole === "salesperson") && (
                  <UserSelect
                    selectedUser={selectedUser}
                    onSelectUser={onSelectUser}
                  />
                )}

                <label
                  htmlFor="userSelect"
                  className="block text-md font-semibold mb-1"
                >
                  Delivery Address
                </label>
                <div className="relative">
                  <select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    disabled={isLoadingAddresses}
                    className="block w-full appearance-none px-4 py-3 pr-10 text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 shadow transition-all duration-200"
                  >
                    <option value="">Select Address</option>
                    {addresses?.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.name} - {address.address}, {address.city}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M7 8l3 3 3-3"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{(product.discounted_price || product.price) * quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium text-gray-700">Tax</span>
                  <span className="text-lg font-semibold text-green-700">
                    ₹{taxAmount}
                  </span>
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border rounded-lg min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.inventory, quantity + 1))
                    }
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    disabled={quantity >= product.inventory}
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.inventory} items available
                </p>
              </div>

              {/* Total */}
              <div className="border-t pt-4 mt-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{Number(discountedPrice * quantity) + Number(taxAmount)}
                  </span>
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={isPlacingOrder}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isPlacingOrder ? (
                  <div className="flex justify-center">
                    <CartLoader />
                  </div>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BuyNowModal;
