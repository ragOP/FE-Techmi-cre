import { load } from "@cashfreepayments/cashfree-js";
import CartLoader from "../loader/CartLoader";
import { apiService } from "../../utils/api/apiService";
import { toast } from "react-toastify";
import { endpoints } from "../../utils/endpoints";
import { useNavigate } from "react-router";
import { getItem } from "../../utils/local_storage";

function Checkout({
  addressId,
  cartId,
  couponId,
  isPlacingOrder,
  currentSelectedUser,
  finalPrice
}) {
  const navigate = useNavigate();
  let cashfree;

  const localStorageRole = getItem("role");

  // Initialize Cashfree SDK
  const initializeSDK = async () => {
    cashfree = await load({
      mode: "sandbox", // Change to "production" for live environment
    });
  };

  initializeSDK();

  // Create Payment Session
  const createPaymentSession = async () => {
    try {
      const apiResponse = await apiService({
        endpoint: endpoints.payment,
        method: "POST",
        data: {
          addressId: addressId,
          cartId: cartId,
          couponId: couponId,
          amount: Number(finalPrice),
          orderedForUser: currentSelectedUser,
        },
      });
      return apiResponse?.response?.data?.payment_session_id;
    } catch (error) {
      console.error("Error creating payment session:", error);
      toast.error("Failed to create payment session. Please try again.");
      return null;
    }
  };

  const doPayment = async () => {
    if (localStorageRole === "salesperson" || localStorageRole === "dnd") {
      if (!currentSelectedUser) {
        toast.error("Please select a user to place the order");
        return;
      }
    }
    const paymentSessionId = await createPaymentSession();

    if (!paymentSessionId) {
      return;
    }

    try {
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self",
      };

      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred during payment. Please try again.");
    }
  };

  return (
    <div className="row">
      <p>Click below to open the checkout page in the current tab</p>
      <button
        onClick={doPayment}
        className={`${
          isPlacingOrder ? "pointer-events-none" : ""
        } w-full mt-6 bg-[#00008B] text-white py-3 rounded-3xl text-lg font-medium`}
      >
        {isPlacingOrder ? (
          <div className="my-1">
            <CartLoader />
          </div>
        ) : (
          "Proceed to Checkout"
        )}
      </button>
    </div>
  );
}

export default Checkout;
