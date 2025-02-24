import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

const AnimationSlider = ({ children }) => {
  const totalSlides = React.Children.count(children);
  const slidesToShow = Math.min(4.5, totalSlides);

  const settings = {
    infinite: totalSlides > 1, // Disable infinite loop for a single product
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    dots: totalSlides > 1, // Hide dots if only one product
    prevArrow: totalSlides > 1 ? <PrevArrow /> : null, // Hide arrows if only one product
    nextArrow: totalSlides > 1 ? <NextArrow /> : null,
    centerMode: totalSlides === 1, // Center the slide when there's only one product
    centerPadding: totalSlides === 1 ? "30%" : "0", // Prevent full width for a single product
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow,
          dots: totalSlides > 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, totalSlides),
          dots: totalSlides > 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          dots: totalSlides > 1,
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="mb-10 relative">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default AnimationSlider;
