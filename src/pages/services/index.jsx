import React, { forwardRef, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CategoryGrid from "../../components/home/Categ_Options";
import HouseCleaning from "../../components/service/HouseCleaning";
import Pharmaceutical from "../../components/service/Pharmaceutical";
import LaundryService from "../../components/service/LaundryService";
import Tagtitle from "../../components/service/service_components/Pharmaceutical_Services/tagtitle";
import ServiceDescription from "../../components/service_description";
import { description } from "../../constant";
import { motion } from "framer-motion";

// Variants for the card animations
const cardVariants = {
  hidden: { opacity: 0, x: -100 }, // Start offscreen to the left
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Service = () => {
  const location = useLocation();
  const selectedCardTitle = location.state?.name || null;

  const houseCleaningRef = useRef(null);
  const pharmaceuticalRef = useRef(null);
  const laundryServiceRef = useRef(null);
  const serviceRef = useRef(null);

  const scrollToRef = (ref) => {
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  useEffect(() => {
    switch (selectedCardTitle) {
      case "House Cleaning":
        scrollToRef(houseCleaningRef);
        break;
      case "Pharmaceutical":
        scrollToRef(pharmaceuticalRef);
        break;
      case "Laundry Service":
        scrollToRef(laundryServiceRef);
        break;
      default:
        scrollToRef(serviceRef);
        break;
    }
  }, [selectedCardTitle]);

  return (
    <div>
      <Tagtitle />
      <CategoryGrid />

      {selectedCardTitle && (
        <div className="mt-6">
          <div ref={houseCleaningRef}>
            {selectedCardTitle === "House Cleaning" && <HouseCleaning />}
          </div>
          <div ref={pharmaceuticalRef}>
            {selectedCardTitle === "Pharmaceutical" && <Pharmaceutical />}
          </div>
          <div ref={laundryServiceRef}>
            {selectedCardTitle === "Laundry Service" && <LaundryService />}
          </div>
        </div>
      )}

      {!selectedCardTitle && <ServiceDetailsBox ref={serviceRef} />}
    </div>
  );
};

export default Service;

export const ServiceDetailsBox = forwardRef((prop, ref) => {
  return (
    <div ref={ref}>
      {/* First Card - Comes from the left */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <ServiceDescription
          reverse={false}
          title="House Cleaning"
          image="https://res.cloudinary.com/dacwig3xk/image/upload/v1740342553/uploads/images/wrmpnukabjaqfpbzuehl.png"
          description={description[0]}
        />
      </motion.div>

      {/* Second Card - Comes from the right */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 100 }, // Start offscreen to the right
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <ServiceDescription
          reverse={true}
          title="Pharmaceutical"
          image="https://res.cloudinary.com/dacwig3xk/image/upload/v1740342674/uploads/images/ou5nt9qf4yctozmcwgwc.png"
          description={description[1]}
        />
      </motion.div>

      {/* Third Card - Comes from the left */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -100 }, // Start offscreen to the left
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <ServiceDescription
          reverse={false}
          title="Laundry Services"
          image="https://res.cloudinary.com/dacwig3xk/image/upload/v1740342717/uploads/images/jvg1lophws6vvjsudjcy.png"
          description={description[2]}
        />
      </motion.div>
    </div>
  );
});

