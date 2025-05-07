const axios = require("axios");

export async function createPaymentSession(customerDetails, orderDetails) {
  const response = await axios.post(
    "https://sandbox.cashfree.com/pg/orders",
    {
      order_id: "order_" + Date.now(),
      order_amount: orderDetails.amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerDetails.id,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-client-id": "TEST105574147e6653e20fe2f019fe5141475501",
        "x-client-secret":
          "cfsk_ma_test_525a51413de6c616b014bd5145c3275b_1f7de502",
      },
    }
  );
  return response.data.payment_session_id;
}
