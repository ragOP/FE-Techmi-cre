import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { apiService } from "../../utils/api/apiService";
import { endpoints } from "../../utils/endpoints";
import { useNavigate, useSearchParams } from "react-router";
import { getItem } from "../../utils/local_storage";

const PaymentProcessing = ({
  currentSelectedUser,
  placeOrderMutation,
  isPlacingOrder,
  onClose,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderType = searchParams.get("orderType");
  const cartId = searchParams.get("cartId");
  const addressId = searchParams.get("addressId");
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const couponId = searchParams.get("couponId");
  const orderedForUser = searchParams.get("orderedForUser");

  const localStorageRole = getItem("role");
  const localStorageId = getItem("userId");

  const [loading, setLoading] = useState(true);
  const hasProcessedOrder = useRef(false);

  const onPlaceOrder = async () => {
    if (hasProcessedOrder.current) {
      return;
    }

    if(orderType !== "buyNow"){
      if (!cartId || !addressId) {
        toast.error("Missing cart or address information.");
        onClose();
        return;
      }
    }

    if(orderType === "buyNow"){
      const payload = {
        addressId,
        couponId: couponId || null,
        productId,
        quantity,
        orderId,
        ...(localStorageRole === "salesperson" || localStorageRole === "dnd"
          ? { orderedBy: localStorageId, orderedForUser: orderedForUser }
          : {}),
      };

      hasProcessedOrder.current = true;
      placeOrderMutation(payload);
    } else {
      const payload = {
        cartId,
        addressId,
        couponId: couponId || null,
        orderId,
        ...(localStorageRole === "salesperson" || localStorageRole === "dnd"
          ? { orderedBy: localStorageId, orderedForUser: orderedForUser }
          : {}),
      };

      hasProcessedOrder.current = true;
      placeOrderMutation(payload);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    if (!orderId) {
      toast.error("Invalid order ID");
      onClose();
      return;
    }

    const verifyAndPlaceOrder = async () => {
      if (hasProcessedOrder.current) {
        return;
      }

      try {
        const apiResponse = await apiService({
          endpoint: `${endpoints.cashfreeOrderDetails}/${orderId}`,
          method: "GET",
        });

        if (!isSubscribed) return;

        const data = apiResponse?.response?.data?.[0];

        if (data?.payment_status === "SUCCESS") {
          await onPlaceOrder();
          if (isSubscribed) {
            toast.success("Payment verified successfully!");
            navigate("/order");
          }
        } else {
          if (isSubscribed) {
            toast.error("Payment not verified. Redirecting to cart.");
            onClose();
          }
        }
      } catch (error) {
        if (isSubscribed) {
          toast.error("Something went wrong during payment verification.");
          onClose();
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    verifyAndPlaceOrder();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isSubscribed = false;
    };
  }, [orderId]);

  if (loading) {
    return <p className="text-center mt-10">Verifying payment...</p>;
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-green-600">Thank You!</h1>
      <p>Your payment was successful.</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  );
};

export default PaymentProcessing;
