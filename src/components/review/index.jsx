import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "./helper";
import { timeAgo } from "../../utils/check_date_diffrence";

export default function ReviewSlider({ id, handleOpenReview }) {
  const [current, setCurrent] = useState(0);
  const itemsPerSlide = 3;

  const params = { productId: id };

  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      try {
        return await fetchReviews({ params });
      } catch (error) {
        throw new Error("Failed to fetch reviews");
      }
    },
    staleTime: 300000,
  });

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrent(
          (prev) => (prev + 1) % Math.ceil(reviews.length / itemsPerSlide)
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading reviews...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Failed to load reviews. Please try again later.
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-gray-600 pb-6">
        <button onClick={handleOpenReview} className="right-4 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
        Post Review
      </button>
        <p>No reviews available.</p>
      </div>
    );
  }

  const centerClass = reviews.length < itemsPerSlide ? "justify-center" : "";

  return (
    <div className="relative w-full max-w-6xl mx-auto p-6 flex flex-col items-center bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        What Our Customers Say
      </h2>
      <button onClick={handleOpenReview} className="absolute top-3 right-4 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
        Post Review
      </button>

      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${centerClass}`}
          >
            {reviews
              .slice(current * itemsPerSlide, (current + 1) * itemsPerSlide)
              .map((review) => (
                <div
                  key={review.id}
                  className="p-6 text-center bg-white shadow-lg rounded-lg border border-gray-200 w-full max-w-sm mx-auto"
                >
                  <p className="text-lg font-bold text-gray-800">
                    {review.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    By {review.name || "anynomous"} on {timeAgo(review.createdAt)}
                  </p>
                  <p className="text-gray-600 mt-2">"{review.description}"</p>
                  <p className="mt-2 text-yellow-500 text-xl">
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
