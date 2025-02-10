import React, { useState } from "react";
import cardio_1 from "../../../../../assets/services/para/cardio_1.svg";
import diabetic_1 from "../../../../../assets/services/para/diabetic_1.svg";
import elderly_care_1 from "../../../../../assets/services/para/elderly_care_1.svg";
import group_1 from "../../../../../assets/services/para/group_1.svg";
import group_2 from "../../../../../assets/services/para/group_2.svg";
import group_3 from "../../../../../assets/services/para/group_3.svg";
import immunity_1 from "../../../../../assets/services/para/immunity_1.svg";
import liver_care_1 from "../../../../../assets/services/para/liver_care_1.svg";
import pain_relief_1 from "../../../../../assets/services/para/pain_relief_1.svg";
import sexual_health_1 from "../../../../../assets/services/para/sexual_health_1.svg";

const HealthCondition = () => {
  const [conditions] = useState([
    { id: 1, title: "Diabetes Care", img: diabetic_1 },
    { id: 2, title: "Cardiac Care", img: cardio_1 },
    { id: 3, title: "Stomach Care", img: group_1 },
    { id: 4, title: "Pain Relief", img: pain_relief_1 },
    { id: 5, title: "Liver Care", img: liver_care_1 },
    { id: 6, title: "Oral Care", img: group_2 },
    { id: 7, title: "Respiratory", img: group_3 },
    { id: 8, title: "Sexual Health", img: sexual_health_1 },
    { id: 9, title: "Elderly Care", img: elderly_care_1 },
    { id: 10, title: "Cold & Immunity", img: immunity_1 },
  ]);

  return (
    <div className="xl:w-4/5 lg:w-full mx-auto flex flex-col mt-20">
    <h2 className="text-center text-3xl font-semibold text-[#00008B] mb-5">
      Browse by Health Condition
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4 p-4">
      {conditions.map((condition, index) => (
        <div
          key={condition.id}
          className={`flex  items-center lg:justify-around xl:justify-evenly gap-x-2 border  lg:p-2 xl:p-4 rounded-lg shadow-md 
            hover:shadow-lg transition-all 
            ${index < 5 ? "bg-[#A0D8EC]" : "bg-[#82C8E5]"}`}
        >
          <div className="bg-white w-10 h-10 ml-1  mt-1 rounded-md mb-2">
            <img src={condition.img} alt={condition.title} className="w-10 h-10  " />
          </div>
          <span className="text-gray-700 font-medium lg:text-sm xl:text-base text-center">{condition.title}</span>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default HealthCondition;
