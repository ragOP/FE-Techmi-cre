import React, { useEffect, useRef, useState } from "react"
import Pricing from "../service_components/House_Cleaning/Price_offer"
import ServicesInfo from "../service_components/House_Cleaning/Service_info"
import Aboutus from "../service_components/House_Cleaning/About_us"
import Services from "../service_components/House_Cleaning/Our_service"
import prescription from "../../../assets/solutions/prescription.svg"
import Testimonials from "../../common/testimonial"
import HouseCleaningProducts from "../service_components/House_Cleaning/House_Cleaning_Products"
import ServiceFilter from "../../service_filter"
import { useQuery } from "@tanstack/react-query"

const HouseCleaning = ({internalPageConfig}) => {
  const productsRef = useRef(null);
  const [filterCategories, setFilterCategories] = useState([])

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
  ])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    if (selectedCategory && productsRef.current) {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory]);
  return (
    <div className="space-y-5">
      <ServiceFilter filterCategories={filterCategories} />
      <Services setFilterCategories={setFilterCategories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <Aboutus
        title="About Us"
        desc={internalPageConfig?.aboutDescription}
        src={internalPageConfig?.aboutUsImage}
      />
      {selectedCategory && (
        <div ref={productsRef}>
          <HouseCleaningProducts category={selectedCategory} />
        </div>
      )}
      {/* <ServicesInfo /> */}
      {/* <Pricing /> */}
      <h2 className="xl:text-3xl text-2xl font-bold mb-2 px-10 text-center">
        Our clients praise us <br /> for great service.
      </h2>
      <Testimonials testimonialData={testimonialData} />
    </div>
  )
}

export default HouseCleaning
