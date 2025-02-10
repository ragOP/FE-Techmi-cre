import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Frame1 from '../../../assets/cateoptions/Frame1.png';
import Frame2 from '../../../assets/cateoptions/Frame2.png';
import Frame3 from '../../../assets/cateoptions/Frame3.png';

const categories = [
  { id: 1, imageSrc: Frame1, title: "House Cleaning" },
  { id: 2, imageSrc: Frame2, title: "Pharmaceutical" },
  { id: 3, imageSrc: Frame3, title: "Laundry Service" }
];

const CategoryCard = ({ imageSrc, title, onClick, isHighlighted }) => {
  return (
    <div
      onClick={onClick}
      className={`xl:w-96 xl:h-96 lg:w-72 lg:h-72 h-64 w-[80%] mx-3 rounded-2xl shadow-lg overflow-hidden relative flex items-center justify-center cursor-pointer border-4 transition-transform duration-300 ${
        isHighlighted ? "border-[#00008B] scale-110" : "border-transparent"
      }`}
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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

const CategoryGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const highlightedCard = location.state?.selectedCard || null;

  return (
    <div className="flex flex-col md:flex-row gap-2 space-y-4 justify-center mb-20 items-center">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          imageSrc={category.imageSrc}
          title={category.title}
          onClick={() => navigate("/service", { state: { selectedCard: category } })}
          isHighlighted={highlightedCard && highlightedCard.id === category.id}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
