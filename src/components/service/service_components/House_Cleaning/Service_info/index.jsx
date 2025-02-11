import React, { useState } from "react";

const ServicesInfo = () => {
  const [info, setInfo] = useState({
    services: [
      "Home Deep Cleaning",
      "Kitchen & Bathroom Cleaning",
      "Sofa & Carpet Cleaning",
      "Office & Commercial Cleaning",
      "Marble Polishing & Floor Care",
      "Pest Control & Sanitization",
      "Bird Netting & Disinfection",
      "Car Cleaning & Swimming Pool Cleaning",
    ],
    reasons: [
      "Experienced, friendly, and professional technicians.",
      "Advanced cleaning technology for thorough, hygienic results.",
      "Flexible booking slots—available anytime.",
      "Focus on health by minimizing dust, allergens, and infections.",
    ],
    cities:
      "With our successful presence in Delhi NCR, we’ve expanded to serve cities across India, including Mumbai, Pune, Bangalore, Hyderabad, Chennai, Jaipur, and more—offering affordable and reliable cleaning services everywhere.",
  });

  return (
    <div className="p-6 border-2 rounded-lg  bg-gradient-to-r mx-28   from-[rgba(69,166,207,0.1)] to-[rgba(0,0,192,0.1)] ">
      <h2 className="text-3xl font-bold">Our Services</h2>
      <p className="font-normal text-xl">We provide a wide range of cleaning services, including:</p>
      <ul className="mt-2 text-xl list-disc ml-6">
        {info.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-bold mt-6">Why Choose Us?</h2>
      <ul className="mt-2 text-xl list-disc ml-6">
        {info.reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-bold mt-6">Serving Cities Across India</h2>
      <p className="mt-2 text-xl">{info.cities}</p>
    </div>
  );
};

export default ServicesInfo;
