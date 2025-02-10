import React from "react";
import { useLocation } from "react-router-dom";
import CategoryGrid from "../../components/home/Categ_Options";
import HouseCleaning from "../../components/service/HouseCleaning";
import Pharmaceutical from "../../components/service/Pharmaceutical";
import LaundryService from "../../components/service/LaundryService";
import Tagtitle from "../../components/service/service_components/Pharmaceutical_Services/tagtitle";

const Service = () => {
  const location = useLocation();
  const selectedCard = location.state?.selectedCard || null;

  return (
    <div>
      <Tagtitle />
      <CategoryGrid />

      {selectedCard && (
        <div className="mt-6">
          {selectedCard.title === "House Cleaning" && <HouseCleaning />}
          {selectedCard.title === "Pharmaceutical" && <Pharmaceutical />}
          {selectedCard.title === "Laundry Service" && <LaundryService />}
        </div>
      )}
    </div>
  );
};

export default Service;
