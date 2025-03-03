import React, { useEffect, useRef, useState } from "react";
import Aboutus from "../service_components/House_Cleaning/About_us";
import prescription from "../../../assets/solutions/prescription.svg";
import OurServices from "../service_components/Laundry_Service/Our_Services";
import Testimonials from "../../common/testimonial";
import { fetchProducts } from "../../home/featured_products/helper/fetchProducts";
import { useMutation, useQuery } from "@tanstack/react-query";
import Vectortick from "../../../assets/services/para/Vectortick.svg";
import Vectorgrey from "../../../assets/services/para/vectorgrey.svg";
import { getItem } from "../../../utils/local_storage";
import { fetchCart } from "../../../pages/cart/helper/fecthCart";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../loader/LoadingSpinner";
import useToast from "../../../hooks";
import { toast } from "react-toastify";
import CartLoader from "../../loader/CartLoader";
import ServiceFilter from "../../service_filter";

const LaundryService = () => {
  const productsRef = useRef(null);
  const [filterCategories, setFilterCategories] = useState([]);
  const [testimonialData, setTestimonialData] = useState([
    {
      name: "Alice Johnson",
      img: "https://randomuser.me/api/portraits/women/1.jpg",
      review:
        "This app has completely changed the way I manage my expenses. It's intuitive, fast, and has all the features I need! The categorization and analytics make it incredibly easy to track my spending habits, and the clean design makes budgeting feel effortless. I highly recommend it to anyone looking to take control of their finances!",
    },
    {
      name: "Michael Smith",
      img: "https://randomuser.me/api/portraits/men/2.jpg",
      review:
        "A game-changer for budgeting! The UI is clean, and the insights help me stay on top of my finances effortlessly. I love how it breaks down expenses in such a clear way, making sure I never overspend. The reminders and tracking features are perfect for keeping me accountable. This app is exactly what I was looking for!",
    },
    {
      name: "Sophia Martinez",
      img: "https://randomuser.me/api/portraits/women/3.jpg",
      review:
        "I've tried many expense trackers, but this one stands out. The experience is seamless, and I love the detailed reports. The ability to set goals and track my progress over time has been incredibly useful. Plus, the interface is beautifully designed, making it a pleasure to use every day. I wouldn't go back to any other tracker!",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory]);

  return (
    <div className="space-y-5">
      {/* <Searchbox /> */}
      <ServiceFilter filterCategories={filterCategories} />
      <OurServices
        setFilterCategories={setFilterCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Aboutus
        title="About Us"
        desc="We are your one-stop solution for all your laundry needs. Discover why Caresync is the best laundry service provider in India and why customers trust us for their laundry requirements."
        desc2="Whether you are a student or a busy professional living away from home, our laundry services promise to free up your time and deliver a clean, spotless set of clothes. We treat your laundry with great care."
        src={prescription}
      />

      {selectedCategory && (
        <div ref={productsRef}>
          <LaundaryCardList category={selectedCategory} />
        </div>
      )}

      <h2 className="xl:text-3xl text-2xl font-bold mb-2 px-10 text-center">
        Our clients praise us <br /> for great service.
      </h2>
      <Testimonials testimonialData={testimonialData} />
    </div>
  );
};

export default LaundryService;

export const LaundaryCardList = ({ category }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const name = category?.name;
  const id = category?._id;

  const params = {
    category_id: id,
    page: 1,
    per_page: 10,
  };

  const {
    data: laundaryProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["laundary_products", id],
    queryFn: () => fetchProducts({ params }),
  });

  return (
    <div className="md:px-12 space-y-2 pt-8">
      <h1 className="text-3xl font-semibold text-center">{name}</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {laundaryProducts && laundaryProducts.length > 0 ? (
            <div className="flex flex-col md:flex-row p-4 gap-8 justify-center items-center">
              {laundaryProducts.map((product) => {
                const isSelected =
                  selectedCard &&
                  selectedCard.toString() === product._id.toString();
                return (
                  <LaundaryCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    discountedPrice={product.discounted_price}
                    smallDescription={product.small_description}
                    points={product.meta_data.points || []}
                    onClick={() => setSelectedCard(product._id)}
                    isSelected={isSelected}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500">No products found.</div>
          )}
        </>
      )}
    </div>
  );
};

export const LaundaryCard = ({
  id,
  name,
  isSelected,
  discountedPrice,
  smallDescription,
  price,
  points,
}) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const payload = {
    user_id: getItem("userId"),
    product_id: id,
    quantity: 1,
  };

  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: () =>
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
    addToCartMutation();
  };

  return (
    <div
      className={`flex flex-col w-full md:w-1/4 h-[100%]  border-2 rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
        isSelected === id
          ? "bg-gradient-to-r from-[rgba(0,0,192,0.1)] to-[rgba(69,166,207,0.1)] border-blue-500"
          : "border-gray-300 bg-white"
      }`}
    >
      <div className="flex-grow">
        <h2 className="text-2xl font-normal">{name}</h2>
        <p className="text-2xl font-bold">
          ₹ {discountedPrice} / <span className="">{price}</span>
        </p>
        <p className="text-base font-medium text-[#3F3F3F]">
          {smallDescription}
        </p>
        <ul className="mt-4 space-y-2">
          <p className="text-base text-[#3F3F3F] font-medium">{name}</p>
          {points.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <img
                src={isSelected === id ? Vectortick : Vectorgrey}
                alt="icon"
                className="w-4 h-4"
              />

              <span className="text-sm xl:text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={!isPending && handleAddToCart}
        className={`mt-4 py-2 px-4 rounded-3xl w-full font-semibold ${
          isSelected === id
            ? "bg-[#141749] text-white"
            : "border border-[#00008B] text-blue-500"
        } hover:bg-blue-50`}
      >
        {isPending ? (
          <div className="my-1">
            <CartLoader />
          </div>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
};
