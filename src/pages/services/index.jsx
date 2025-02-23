import React from "react";
import { useLocation } from "react-router-dom";
import CategoryGrid from "../../components/home/Categ_Options";
import HouseCleaning from "../../components/service/HouseCleaning";
import Pharmaceutical from "../../components/service/Pharmaceutical";
import LaundryService from "../../components/service/LaundryService";
import Tagtitle from "../../components/service/service_components/Pharmaceutical_Services/tagtitle";

const Service = () => {
  const location = useLocation();
  const selectedCardTitle = location.state?.name || null;
console.log(">>", selectedCardTitle)
  return (
    <div>
      <Tagtitle />
      <CategoryGrid />

      {selectedCardTitle && (
        <div className="mt-6">
          {selectedCardTitle === "House Cleaning" && <HouseCleaning />}
          {selectedCardTitle === "Pharmaceutical" && <Pharmaceutical />}
          {selectedCardTitle === "Laundry Service" && <LaundryService />}
        </div>
      )}
    </div>
  );
};

export default Service;
