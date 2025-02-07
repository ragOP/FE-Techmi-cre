import React, { useState } from "react";
import Categroies1 from "../../../../../assets/services/para/Categories1.svg";
import Categroies2 from "../../../../../assets/services/para/Categories2.svg";
import Categroies3 from "../../../../../assets/services/para/Categories3.svg";
import Categroies4 from "../../../../../assets/services/para/Categories4.svg";

const CategoriesPhaema = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Medicines", discount: "SAVE 20% OFF", image: Categroies1 },
    { id: 2, name: "Syringes", discount: "SAVE 20% OFF", image: Categroies2 },
    { id: 3, name: "Healthy and Fresh", discount: "SAVE 20% OFF", image: Categroies3 },
    { id: 4, name: "Medicines", discount: "SAVE 20% OFF", image: Categroies4 },
  ]);

  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold text-[#00008B]">
        Shop By Categories
      </h1>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <img src={category.image} alt={category.name} className="w-full h-56 object-contain mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{category.name}</h2>
            <p className="text-lg text-[#00008B] font-semibold mt-2">{category.discount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPhaema;
