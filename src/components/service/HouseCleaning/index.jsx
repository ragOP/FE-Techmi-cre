import React from "react";
import Pricing from "../service_components/House_Cleaning.jsx/Price_offer";
import ServicesInfo from "../service_components/House_Cleaning.jsx/Service_info";
import Aboutus from "../service_components/House_Cleaning.jsx/About_us";
import Services from "../service_components/House_Cleaning.jsx/Our_service";

const HouseCleaning = () => {
  return (
    <div className="space-y-10">
      <Services />
      <Aboutus />
      <ServicesInfo />
      <Pricing />
    </div>
  );
};

export default HouseCleaning;
