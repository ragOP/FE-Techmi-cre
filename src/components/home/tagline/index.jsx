import React from "react";
import { motion } from "framer-motion";

const Tagline = () => {
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
      {/* Animated Heading */}
      <motion.p
        className="text-[#04050B] text-center font-bold sm:text-[1.5rem] text-[1.3rem] md:text-[2rem] lg:text-[2.45rem] leading-tight"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        From <span className="text-[#00008B]">Healing</span> to{" "}
        <span className="text-[#00008B]">Hygiene</span> &#8211; Your Trusted{" "}
        <br /> Partner for Health and Home!
      </motion.p>

      {/* Animated Subheading */}
      <motion.p
        className="text-[#1C0547CC] text-center text-[15px] w-[80%] md:text-[1rem] lg:text-[1.3rem] mt-1.5 font-medium"
        variants={subheadingVariants}
        initial="hidden"
        animate="visible"
      >
        Access essential medicines and professional cleaning with ease &#8211;
        it&apos;s care, simplified.
      </motion.p>
    </div>
  );
};

export default Tagline;