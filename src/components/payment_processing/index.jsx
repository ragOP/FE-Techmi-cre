import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "../../utils/api/apiService";
import { endpoints } from "../../utils/endpoints";
import { useNavigate, useSearchParams } from "react-router";
import { getItem } from "../../utils/local_storage";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import OrderProcessing from "../../assets/OrderProcessing.json";
import OrderSuccessful from "../../assets/OrderSuccessful.json";
import OrderFailed from "../../assets/OrderFailed.json";

const PaymentProcessing = () => {
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

  const [status, setStatus] = useState("processing"); // processing | success | failed
  const [cashfreeOrderId, setCashfreeOrderId] = useState(null);

  const { mutate: placeOrderMutation } = useMutation({
    mutationFn: async (payload) => {
      const apiResponse = await apiService({
        endpoint: orderType === "normal" ? endpoints.order : endpoints.buyNow,
        method: "POST",
        data: payload,
      });

      if (
        apiResponse?.response?.success &&
        apiResponse?.response?.data?.orderPlaced
      ) {
        setCashfreeOrderId(
          apiResponse?.response?.data?.order?.cashfree_order?.id
        );
        setStatus("success");
        toast.success("Order placed successfully!");
      } else {
        setStatus("failed");
        toast.error(apiResponse?.response?.message || "Failed to place order");
      }
    },
    onError: () => {
      setStatus("failed");
      toast.error("Failed to place order");
    },
  });

  const onPlaceOrder = async () => {
    if (orderType !== "buyNow") {
      if (!cartId || !addressId) {
        toast.error("Missing cart or address information.");
        setStatus("failed");
        return;
      }
    }

    let payload = {};
    if (orderType === "buyNow") {
      payload = {
        productId,
        quantity,
        addressId,
        orderId,
        ...(localStorageRole === "salesperson" || localStorageRole === "dnd"
          ? { orderedBy: localStorageId, orderedForUser: orderedForUser }
          : {}),
      };
    } else {
      payload = {
        cartId,
        addressId,
        couponId: couponId || null,
        orderId,
        ...(localStorageRole === "salesperson" || localStorageRole === "dnd"
          ? { orderedBy: localStorageId, orderedForUser: orderedForUser }
          : {}),
      };
    }
    placeOrderMutation(payload);
  };

  useEffect(() => {
    if (!orderId) {
      toast.error("Invalid order ID");
      setStatus("failed");
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
          await onPlaceOrder();
          toast.success("Payment verified successfully!");
        } else {
          setStatus("failed");
          toast.error("Payment not verified. Redirecting to cart.");
          navigate(-1);
          setTimeout(() => {
            if (window.location.pathname.includes("payment-processing")) {
              navigate("/");
            }
          }, 500);
        }
      } catch (error) {
        setStatus("failed");
        toast.error("Something went wrong during payment verification.");
        navigate(-1);
        setTimeout(() => {
          if (window.location.pathname.includes("payment-processing")) {
            navigate("/");
          }
        }, 500);
      }
    };

    verifyAndPlaceOrder();
    window.history.replaceState(null, "", "/payment-processing#done");
  }, [orderId]);

  // UI rendering based on status
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-8">
      {status === "processing" && (
        <>
          <Lottie
            animationData={OrderProcessing}
            style={{ width: 180, height: 180 }}
          />
          <h2 className="text-xl font-bold mt-4 text-blue-700">
            Processing your payment...
          </h2>
          <p className="text-gray-600 mt-2">
            Please wait while we verify your payment and place your order.
          </p>
        </>
      )}
      {status === "success" && (
        <>
          <Lottie
            animationData={OrderSuccessful}
            style={{ width: 180, height: 180 }}
          />
          <h1 className="text-2xl font-bold text-green-600 mt-2">Thank You!</h1>
          <p className="text-lg text-gray-700 mt-2">
            Your payment was successful and your order has been placed.
          </p>
          {cashfreeOrderId && (
            <p className="mt-2 text-gray-700">
              <strong>Cashfree Order ID:</strong> {cashfreeOrderId}
            </p>
          )}
          <button
            onClick={() => navigate("/order")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to My Orders
          </button>
        </>
      )}
      {status === "failed" && (
        <>
          <Lottie
            animationData={OrderFailed}
            style={{ width: 180, height: 180 }}
          />
          <h1 className="text-2xl font-bold text-red-600 mt-2">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Sorry, your payment could not be verified or the order could not be
            placed.
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Back to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentProcessing;
