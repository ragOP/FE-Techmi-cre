import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "../../utils/api/apiService";
import { endpoints } from "../../utils/endpoints";
import { useNavigate, useSearchParams } from "react-router";

const PaymentProcessing = ({ placeOrderMutation, isPlacingOrder, onClose }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const cartId = searchParams.get("cartId");
  const addressId = searchParams.get("addressId");
  const couponId = searchParams.get("couponId");

  const [loading, setLoading] = useState(true);

  const onPlaceOrder = async () => {
    console.log("Placing order with cartId:", cartId, addressId);
    if (!cartId || !addressId) {
      toast.error("Missing cart or address information.");
      onClose();
      return;
    }

    const payload = {
      cartId,
      addressId,
      couponId: couponId || null,
      orderId,
    };

    placeOrderMutation(payload);
  };

  useEffect(() => {
    if (!orderId) {
      toast.error("Invalid order ID");
      onClose();
      return;
    }

    const verifyAndPlaceOrder = async () => {
      try {
        const apiResponse = await apiService({
          endpoint: `${endpoints.cashfreeOrderDetails}/${orderId}`,
          method: "GET",
        });

        const data = apiResponse?.response?.data?.[0];

        if (data?.payment_status === "SUCCESS") {
          toast.success("Payment verified successfully!");
          onPlaceOrder();
          navigate("/order");
        } else {
          toast.error("Payment not verified. Redirecting to cart.");
          onClose();
        }
      } catch (error) {
        toast.error("Something went wrong during payment verification.");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    verifyAndPlaceOrder();
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
