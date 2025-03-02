import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Frame1 from '../../../assets/cateoptions/Frame1.png';
import Frame2 from '../../../assets/cateoptions/Frame2.png';
import Frame3 from '../../../assets/cateoptions/Frame3.png';
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from "./helpers/fetchServices";
import LoadingSpinner from "../../loader/LoadingSpinner";

const services = [
  { id: 1, imageSrc: Frame1, title: "House Cleaning" },
  { id: 2, imageSrc: Frame2, title: "Pharmaceutical" },
  { id: 3, imageSrc: Frame3, title: "Laundry Service" }
];

const ServiceCard = ({ imageSrc, title, onClick, isHighlighted }) => {
  return (
    <div
      onClick={onClick}
      className={`xl:w-96 xl:h-96 lg:w-72 lg:h-72 h-64 w-[80%] mx-3 rounded-2xl shadow-lg overflow-hidden relative flex items-center justify-center cursor-pointer  transition-transform duration-300 ${isHighlighted ? "border-[#00008B] scale-110" : "border-transparent"}`}
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundRepeat: "no-repeat", backgroundPosition: 'center' }}
    >
      <button className="absolute top-2 right-2 bg-[#0A008FBA] p-2 rounded-lg shadow">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </button>
      <div className="absolute bottom-4 w-72 left-1/2 bg-[#0A008FBA] rounded-md transform -translate-x-1/2">
        <p className="text-xl font-medium text-center text-white bg-black bg-opacity-10 px-2 py-1 rounded-lg">
          {title}
        </p>
      </div>
    </div>
  );
};

const ServiceGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const highlightedCardId = location.state?.selectedCardId || null;

  const { data: fetchedCategories, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  if (!isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading services</div>;

  const services = fetchedCategories || [];

  return (
    <div className="flex flex-col md:flex-row gap-2  justify-center mb-20 items-center">
      {services && services?.length > 0 ?
        services.map((service) => {
          const isSelected = highlightedCardId === service._id;
          return (
            <ServiceCard
              key={service._id}
              imageSrc={service.images?.[0]}
              title={service.name || ""}
              onClick={() => navigate("/service", { state: { selectedCardId: service._id, name: service.name } })}
              isHighlighted={isSelected}
            />
          )
        }) :
        <div className="text-center text-gray-500">No service present.</div>
      }
    </div>
  );
};

export default ServiceGrid;
