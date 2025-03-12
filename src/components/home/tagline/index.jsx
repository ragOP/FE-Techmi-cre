import React from "react";
import { motion } from "framer-motion";

const Tagline = ({ heading, subheading, isLoading }) => {
  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  // Animation variants for the subheading
  const subheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
  };

  return (
    <div className="py-10 flex flex-col items-center">
      {isLoading ? (
        // Skeleton Loader
        <div className="w-[80%] flex flex-col items-center">
          <div className="w-full h-8 md:h-12 lg:h-16 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-[90%] h-4 md:h-6 lg:h-8 bg-gray-300 rounded-md mt-2 animate-pulse"></div>
        </div>
      ) : (
        <>
          {/* Animated Heading */}
          <motion.p
            className="text-[#04050B] text-center font-bold sm:text-[1.5rem] text-[1.3rem] md:text-[2rem] lg:text-[2.45rem] leading-tight"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            {heading}
          </motion.p>

          {/* Animated Subheading */}
          <motion.p
            className="text-[#1C0547CC] text-center text-[15px] w-[80%] md:text-[1rem] lg:text-[1.3rem] mt-1.5 font-medium"
            variants={subheadingVariants}
            initial="hidden"
            animate="visible"
          >
            {subheading}
          </motion.p>
        </>
      )}
    </div>
  );
};

export default Tagline;
