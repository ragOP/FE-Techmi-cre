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
import { useQuery } from "@tanstack/react-query";
import { getServiceConfig } from "./helper";
import { getInternalConfig } from "../../components/service/LaundryService/helper";

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

  const { data: serviceConfig, isLoading } = useQuery({
    queryKey: ["service_config"],
    queryFn: () => getServiceConfig({}),
  });

  const { data: internalPageConfig, } = useQuery({
    queryKey: ["internal_config"],
    queryFn: () => getInternalConfig({}),
  });

  const scrollToRef = (ref) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
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
      <Tagtitle
        title={serviceConfig?.heading}
        subTitle={serviceConfig?.subheading}
        isLoading={isLoading}
      />
      <CategoryGrid />

      {selectedCardTitle && (
        <div className="mt-6">
          <div ref={houseCleaningRef}>
            {selectedCardTitle === "House Cleaning" && <HouseCleaning internalPageConfig={internalPageConfig}/>}
          </div>
          <div ref={pharmaceuticalRef}>
            {selectedCardTitle === "Pharmaceutical" && <Pharmaceutical internalPageConfig={internalPageConfig} />}
          </div>
          <div ref={laundryServiceRef}>
            {selectedCardTitle === "Laundry Service" && <LaundryService internalPageConfig={internalPageConfig}/>}
          </div>
        </div>
      )}

      {!selectedCardTitle && (
        <ServiceDetailsBox
          ref={serviceRef}
          serviceConfig={serviceConfig}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Service;

export const ServiceDetailsBox = forwardRef(
  ({ serviceConfig, isLoading }, ref) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className="flex flex-col w-full items-center justify-center space-y-6"
        >
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 shadow-md rounded-xl p-6 w-full max-w-5xl h-60 flex items-center space-x-6"
            >
              <div className="w-36 h-36 bg-gray-300 rounded-lg"></div>

              <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
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
            image={serviceConfig.houseCleaningImage}
            description={serviceConfig.houseCleaningDescription}
            rating={serviceConfig.houseCleaningReviews}
          />
        </motion.div>

        {/* Second Card - Comes from the right */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 }, // Start offscreen to the right
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <ServiceDescription
            reverse={true}
            title="Pharmaceutical"
            image={serviceConfig.pharmaImage}
            description={serviceConfig.pharmaDescription}
            rating={serviceConfig.pharmaReviews}
          />
        </motion.div>

        {/* Third Card - Comes from the left */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 }, // Start offscreen to the left
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <ServiceDescription
            reverse={false}
            title="Laundry Services"
            image={serviceConfig.laundryImage}
            description={serviceConfig.laundryDescription}
            rating={serviceConfig.laundryReviews}
          />
        </motion.div>
      </div>
    );
  }
);
