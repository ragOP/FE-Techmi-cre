import React, { useEffect, useRef, useState } from "react";
import Pricing from "../service_components/House_Cleaning/Price_offer";
import ServicesInfo from "../service_components/House_Cleaning/Service_info";
import Aboutus from "../service_components/House_Cleaning/About_us";
import Services from "../service_components/House_Cleaning/Our_service";
import prescription from "../../../assets/solutions/prescription.svg";
import Testimonials from "../../common/testimonial";
import HouseCleaningProducts from "../service_components/House_Cleaning/House_Cleaning_Products";
import ServiceFilter from "../../service_filter";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "../LaundryService/helper/fetchTestimonials";
import LoadingSpinner from "../../loader/LoadingSpinner";

const HouseCleaning = ({ internalPageConfig }) => {
  const productsRef = useRef(null);
  const [filterCategories, setFilterCategories] = useState([]);

  const { data: testimonialsRes = [], isLoading: testimonialsLoading } =
    useQuery({
      queryKey: ["testimonial"],
      queryFn: () => fetchTestimonials(),
      select: (data) => data?.data,
    });
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory && productsRef.current) {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedCategory]);
  return (
    <div className="space-y-5">
      <ServiceFilter filterCategories={filterCategories} />
      <Services
        setFilterCategories={setFilterCategories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
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
      <div className="pt-10">
        <h2 className="xl:text-3xl text-2xl font-bold mb-2 px-10 text-center">
          Our clients praise us <br /> for great service.
        </h2>
        {testimonialsLoading ? (
          <LoadingSpinner />
        ) : (
          <Testimonials testimonialData={testimonialsRes} />
        )}
      </div>
    </div>
  );
};

export default HouseCleaning;
