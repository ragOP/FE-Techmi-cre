import { useEffect, useState } from "react";
import { getItem } from "../../utils/local_storage";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import Lottie from "lottie-react";
import emptyCartAnimation from "../../assets/EmptyCartAnimation.json";
import { fetchOrder } from "../cart/helper/myOrder";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); 

  const userId = getItem("userId");

  const params = { user_id: userId };

  const fetchOrdersData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchOrder({ params });

      if (response?.data) {
        setOrders(response.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, [userId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie animationData={emptyCartAnimation} loop={true} />
        <p className="text-xl text-gray-500 mt-4">Your orders are empty</p>
      </div>
    );
  }

  return (
    <div className="m-6 min-h-screen bg-gray-100 rounded-lg shadow-xl p-6">
      <div className="flex flex-col space-y-6 md:space-y-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Your Orders
        </h2>

        {currentOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl text-blue-600">{`Order #${order._id}`}</h3>
              <span
                className={`${
                  order.status === "pending" ? "bg-yellow-400" : "bg-green-400"
                } text-white px-3 py-1 rounded-full text-sm`}
              >
                {order.status}
              </span>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-700">
                Total: ₹{order.discountedPriceAfterCoupon}
              </h4>
              <p className="text-sm text-gray-500">
                Order Date:{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <div className="mt-2">
                <h4 className="font-semibold text-md">Delivery Address:</h4>
                <p className="text-gray-600">{order.address.name}</p>
                <p className="text-gray-600">{order.address.address}</p>
                <p className="text-gray-600">{`${order.address.locality}, ${order.address.city}`}</p>
                <p className="text-gray-600">{`${order.address.state}, ${order.address.pincode}`}</p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-gray-800">Items:</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.banner_image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-700">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total Price: ₹
                        {item.product.discounted_price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-300"
          >
            <ChevronLeft />
          </button>

          <div className="text-lg font-semibold text-gray-700">
            Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition duration-300"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
