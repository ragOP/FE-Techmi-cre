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

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  swipeToSlide: true,
  dots: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4.5,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        dots: true,
        arrows:false,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        dots: true, 
        arrows: false,
      },
    },
  ],
};

const AnimationSlider = ({ children }) => {
  return (
    <div className="mb-10 relative">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default AnimationSlider;
