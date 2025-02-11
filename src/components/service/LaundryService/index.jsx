import React, { useState } from "react"
import Aboutus from "../service_components/House_Cleaning/About_us"
import prescription from "../../../assets/solutions/prescription.svg"
import OurServices from "../service_components/Laundry_Service/Our_Services"
import Testimonials from "../../common/testimonial"
import Searchbox from "../service_components/Laundry_Service/Searchbox"

const LaundryService = () => {
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

  return (
    <div className="space-y-10">
      <Searchbox />
      <Aboutus
        title="About Us"
        desc="We are your one-stop solution for all your laundry needs. Discover why Caresync is the best laundry service provider in India and why customers trust us for their laundry requirements."
        desc2="Whether you are a student or a busy professional living away from home, our laundry services promise to free up your time and deliver a clean, spotless set of clothes. We treat your laundry with great care."
        src={prescription}
      />
      <OurServices />

      <h2 className="xl:text-3xl text-2xl font-bold mb-2 px-10">
        Our clients praise us <br /> for great service.
      </h2>
      <Testimonials testimonialData={testimonialData} />
    </div>
  )
}

export default LaundryService
