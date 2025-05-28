import { load } from "@cashfreepayments/cashfree-js";
import CartLoader from "../loader/CartLoader";
import { apiService } from "../../utils/api/apiService";
import { toast } from "react-toastify";
import { endpoints } from "../../utils/endpoints";
import { useNavigate } from "react-router";
import { getItem } from "../../utils/local_storage";
import { checkInventory } from "../../pages/cart/helper/checkInventory";
import { useState } from "react";

function Checkout({
  addressId,
  cartId,
  couponId,
  isPlacingOrder,
  currentSelectedUser,
  finalPrice,
  cart,
  isPrescriptionRequired,
  prescriptionFile,
}) {
  const navigate = useNavigate();
  let cashfree;

  const [creatingSession, setCreatingSession] = useState(false);
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
    if (creatingSession) {
      toast.error("Payment session is already being created. Please wait.");
      return null;
    }
    try {
      setCreatingSession(true);
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
    } finally {
      setCreatingSession(false);
    }
  };

  const doPayment = async () => {
    if (localStorageRole === "salesperson" || localStorageRole === "dnd") {
      if (!currentSelectedUser) {
        toast.error("Please select a user to place the order");
        return;
      }
    }

    if (isPrescriptionRequired && !prescriptionFile) {
      toast.error(
        "Please upload a prescription file to proceed with the order"
      );
      return;
    }

    const productIds = cart
      .filter((item) => item.product.product_type !== "service")
      .map((item) => item.product._id);
    const quantityWithProductIds = cart
      .filter((item) => item.product.product_type !== "service")
      .map((item) => ({
        product_id: item.product._id,
        quantity: item.quantity,
      }));

    if (productIds.length !== 0) {
      const inventoryCheck = await checkInventory({ productIds });
      const productWithLowInventory = inventoryCheck.filter(
        (item) =>
          item.inventory <
          quantityWithProductIds.find((item) => item.product_id).quantity
      );
      if (productWithLowInventory.length > 0) {
        productWithLowInventory.forEach((item) => {
          toast.error(`${item.name} is out of stock`);
        });
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
    <div className="row mt-4">
      <p>Click below to open the checkout page in the current tab</p>
      <button
        onClick={doPayment}
        className={`${
          isPlacingOrder || creatingSession ? "pointer-events-none" : ""
        } w-full mt-4 bg-[#00008B] text-white py-3 rounded-3xl text-lg font-medium`}
      >
        {isPlacingOrder || creatingSession ? (
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
