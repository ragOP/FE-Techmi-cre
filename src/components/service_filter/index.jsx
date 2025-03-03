import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProducts } from "../home/featured_products/helper/fetchProducts";
import { toast } from "react-toastify";
import { getItem } from "../../utils/local_storage";
import { fetchCart } from "../../pages/cart/helper/fecthCart";
import { useNavigate } from "react-router-dom";
import CartLoader from "../loader/CartLoader";

export default function ServiceFilter({ filterCategories }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [servicePackage, setServicePackage] = useState([]);
  const [servicePackageId, setServicePackageId] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useQuery({
    queryKey: ["laundary_products"],
    queryFn: () => fetchProducts({ params: {} }),
  });

  const handleSelectPackage = async (name) => {
    const service = servicePackage.find((service) => service.name === name);
    if (!service) return;
    setServicePackageId(service._id);
  };

  const handleSelectCategory = async (name) => {
    const category = filterCategories.find(
      (category) => category.name === name
    );
    if (!category) return;

    setSelectedCategoryId(category._id);

    const updatedParams = { category_id: category._id };
    const res = await fetchProducts({ params: updatedParams });

    setServicePackage(res);
  };

  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: ({ payload }) =>
      fetchCart({
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      toast.success("Product added to cart!");
      navigate("/cart");
    },
  });

  const handleAddToCart = () => {
    if (!name || !phone) {
      toast.error("Please enter your name and phone number to continue");
      return;
    }
    if (!selectedCategoryId || !servicePackageId) {
      toast.error("Please select a service and package to continue");
      return;
    }
    const token = getItem("token");
    if (!token) {
      return navigate("/login");
    }
    if (isPending) return;
    const userId = getItem("userId");
    const payload = {
      user_id: userId,
      product_id: servicePackageId,
      quantity: 1,
    };
    addToCartMutation({ payload });
  };
  return (
    <div className="bg-gray-50 p-6 rounded-xl drop-shadow-xl border-2 container mx-auto mb-10">
      <h2 className="text-3xl font-semibold text-start mb-4">
        Let’s Make Your Home Sparkle – Contact Us!
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none"
        />
        <input
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 10) {
              setPhone(value);
            }
          }}
          value={phone}
          type="text"
          placeholder="Phone Number"
          className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none"
          maxLength={10}
        />
        {filterCategories && filterCategories.length > 0 && (
          <select
            onChange={(e) => handleSelectCategory(e.target.value)}
            className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none"
          >
            <option>Select Your Service</option>
            {filterCategories.map((category) => (
              <option key={category._id}>{category.name}</option>
            ))}
          </select>
        )}
        <select
          onChange={(e) => handleSelectPackage(e.target.value)}
          className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none"
        >
          <option>Select Your Package</option>
          {servicePackage.map((service) => (
            <option key={service._id}>{service.name}</option>
          ))}
        </select>
      </div>
      <button
        className="mt-4 w-full bg-blue-900 text-white py-3 rounded-full text-center font-semibold flex justify-center items-center gap-2 disabled:opacity-70"
        onClick={handleAddToCart}
      >
        {isPending ? (
          <div className="py-1">
            <CartLoader />
          </div>
        ) : (
          "Book Now"
        )}
        <span className="text-lg">{isPending ? "" : "🧹"}</span>
      </button>
    </div>
  );
}
