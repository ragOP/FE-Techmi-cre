import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = ({ testimonialData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // below 1024px screen
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 pt-4 xl:px-20">
      <Slider {...settings}>
        {Array.isArray(testimonialData) && testimonialData?.map((td) => (
          <div key={td?._id} className="px-2">
            <div
              className="bg-white rounded-md max-w-[350px] mx-auto"
              style={{
                boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex justify-between items-center border-b border-b-[#F5F5F5] px-6 py-4">
                <p className="text-[#0F1030] font-semibold">
                  {td?.customer_name}
                </p>
                <img
                  src={td?.image}
                  alt={td?.customer_name}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              </div>
              <p className="px-7 pt-6 pb-7 text-[#243858] tracking-wider text-sm xl:text-base">
                {(td?.message || "").slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
