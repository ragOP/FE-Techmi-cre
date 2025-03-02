import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CategoryGrid from "../../components/home/Categ_Options";
import HouseCleaning from "../../components/service/HouseCleaning";
import Pharmaceutical from "../../components/service/Pharmaceutical";
import LaundryService from "../../components/service/LaundryService";
import Tagtitle from "../../components/service/service_components/Pharmaceutical_Services/tagtitle";
import ServiceDescription from "../../components/service_description";
import { description } from "../../constant";
import { toast } from "react-toastify";

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
    }, 500);
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
      {!selectedCardTitle && (
        <div ref={serviceRef}>
          <ServiceDescription
            reverse={false}
            title="House Cleaning"
            image="https://res.cloudinary.com/dacwig3xk/image/upload/v1740342553/uploads/images/wrmpnukabjaqfpbzuehl.png"
            description={description[0]}
          />
          <ServiceDescription
            reverse={true}
            title="Pharmaceutical"
            image="https://res.cloudinary.com/dacwig3xk/image/upload/v1740342674/uploads/images/ou5nt9qf4yctozmcwgwc.png"
            description={description[1]}
          />
          <ServiceDescription
            reverse={false}
            title="Laundry Services"
            image="https://res.cloudinary.com/dacwig3xk/image/upload/v1740342717/uploads/images/jvg1lophws6vvjsudjcy.png"
            description={description[2]}
          />
        </div>
      )}
    </div>
  );
};

export default Service;
