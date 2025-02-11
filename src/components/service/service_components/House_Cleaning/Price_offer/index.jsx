import React, { useState } from "react";
import Vectortick from "../../../../../assets/services/para/Vectortick.svg";
import Vectorgrey from "../../../../../assets/services/para/vectorgrey.svg";

const Pricing = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const pricingOptions = [
    {
      id: 1,
      title: "Home Cleaning",
      price: "2500",
      currency: "₹",
      description: "per user/month, billed annually",
      heading: "Studio Apartment (Upto 400 Sqft) – ₹2500/- *",
      features: [
        
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
      ],
    },
    {
      id: 2,
      title: "Fabric Sofa Cleaning",
      price: "5900",
      currency: "₹",
      description: "per user/month, billed annually",
      heading: "For Scaling Businesses",
      features: [
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
        "1 BHK (401 to 600 Sqft) – ₹3800/- *",
      ],
    },
    {
      id: 3,
      title: "Carpet Cleaning",
      price: "129",
      currency: "$",
      description: "per user/month, billed annually",
      heading: "For Big Corporation",
      features: ["Unlimited reporting", "SAML and SSO", "Custom billing", "Up to 3 seats"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:mx-28 px-10  lg:grid-cols-3 gap-6 ">
      {pricingOptions.map((option) => (
        <div
          key={option.id}
          className={`border-2 rounded-3xl p-6 transition-all duration-300 cursor-pointer ${selectedCard === option.id
              ? "bg-gradient-to-r from-[rgba(0,0,192,0.1)] to-[rgba(69,166,207,0.1)] border-blue-500"
              : "border-gray-300 bg-white"
            }`}
          onClick={() => setSelectedCard(option.id)}
        >
          <h2 className="text-2xl font-normal">{option.title}</h2>
          <p className="text-2xl font-bold">
            {option.currency}
            {option.price}
          </p>
          <p className="text-base font-medium text-[#3F3F3F]">{option.description}</p>
          <ul className="mt-4 space-y-2">
          <p className="text-base text-[#3F3F3F] font-medium">{option.heading}</p>
            {option.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <img
                  src={selectedCard === option.id ? Vectortick : Vectorgrey}
                  alt="icon"
                  className="w-4 h-4"
                />
               
                <span className="text-sm xl:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            className={`mt-4 py-2 px-4 rounded-3xl w-full font-semibold ${selectedCard === option.id ? "bg-[#141749] text-white" : "border border-[#00008B] text-blue-500"
              }`}xlxl
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
