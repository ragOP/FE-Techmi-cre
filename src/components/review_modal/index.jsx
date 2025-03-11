import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { postReviews } from "./helper";

export default function ReviewModal({ isOpen, setIsOpen, id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const params = {
    productId: id,
  };

  const queryClient = useQueryClient();

  const { mutate: addNewReview } = useMutation({
    mutationFn: () =>
      postReviews({
        method: "POST",
        body: {
          title,
          description,
          rating,
        },
        params,
      }),
    onSuccess: (data) => {
      if (data?.length !== 0) toast.success("Added Successfully");
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setRating("");
  
      // ✅ Correctly invalidating query
      queryClient.invalidateQueries(["reviews", id]);
    },
  });

  const handleSubmit = () => {
    if (!title || !description || !rating) {
      toast.error("Required Fields are missing");
      return;
    }
    addNewReview();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Post a Review</h2>

            <input
              type="text"
              placeholder="Review Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md mb-3"
            />

            <textarea
              placeholder="Write your review..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md mb-3 h-24"
            ></textarea>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
