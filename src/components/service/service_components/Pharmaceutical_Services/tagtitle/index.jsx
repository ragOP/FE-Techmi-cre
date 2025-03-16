import React from "react";
import { motion } from "framer-motion";

const Tagtitle = ({ title, subTitle, isLoading }) => {
  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  // Animation variants for the subheading
  const subheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <div className="py-10 flex flex-col items-center">
      {isLoading ? (
        <>
          {/* Skeleton for Title */}
          <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-8 md:h-10 lg:h-12 bg-gray-300 animate-pulse rounded-md" />

          {/* Skeleton for Subtitle */}
          <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] h-6 md:h-8 lg:h-10 bg-gray-200 animate-pulse rounded-md mt-2" />
        </>
      ) : (
        <>
          {/* Animated Heading */}
          <motion.p
            className="text-[#04050B] text-center font-bold leading-tight sm:text-[1.5rem] text-[1.3rem] md:text-[2rem] lg:text-[2.45rem]"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.p>

          {/* Animated Subheading */}
          <motion.p
            className="text-[#1C0547CC] text-center xl:w-[46%] lg:w-[55%] w-[80%] md:text-[1rem] lg:text-[1.3rem] text-[1rem] mt-1.5 font-medium"
            variants={subheadingVariants}
            initial="hidden"
            animate="visible"
          >
            {subTitle}
          </motion.p>
        </>
      )}
    </div>
  );
};

export default Tagtitle;
