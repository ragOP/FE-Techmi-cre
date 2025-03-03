import React from "react";
import { motion } from "framer-motion";

const Tagtitle = () => {
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
      {/* Animated Heading */}
      <motion.p
        className="text-[#04050B] text-center font-bold leading-tight sm:text-[1.5rem] text-[1.3rem] md:text-[2rem] lg:text-[2.45rem]"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        Trusted Medications, Right at Your Doorstep.
      </motion.p>

      {/* Animated Subheading */}
      <motion.p
        className="text-[#1C0547CC] text-center xl:w-[46%] lg:w-[55%] w-[80%] md:text-[1rem] lg:text-[1.3rem] text-[1rem] mt-1.5 font-medium"
        variants={subheadingVariants}
        initial="hidden"
        animate="visible"
      >
        We provide fast, reliable access to essential medications, including
        prescriptions and over-the-counter products, ensuring safe and convenient
        healthcare solutions.
      </motion.p>
    </div>
  );
};

export default Tagtitle;