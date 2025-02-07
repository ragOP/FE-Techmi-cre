import React, { useState } from "react";
import   AnimationSlider  from "../../../../common/animations"; 
import insurance_new_pdp from "../../../../../assets/services/para/insurance_new_pdp.svg"; 

const Knowmore = () => {
  const [sliderData, setSliderData] = useState([
    { id: 1, imageSrc: insurance_new_pdp, title: "Product 1" },
    { id: 2, imageSrc: insurance_new_pdp, title: "Product 2" },
    { id: 3, imageSrc: insurance_new_pdp, title: "Product 3" },
    { id: 4, imageSrc: insurance_new_pdp, title: "Product 4" },
    { id: 5, imageSrc: insurance_new_pdp, title: "Product 5" },
    { id: 6, imageSrc: insurance_new_pdp, title: "Product 6" }
  ]);

  return (
    <div className="mt-20">
     
      
      <AnimationSlider>
        {sliderData.map((item) => (
          <div key={item.id}>
            <div className="product-card">
              <img src={item.imageSrc} alt={item.title} className="w-full h-auto" />
            </div>
          </div>
        ))}
      </AnimationSlider>
    </div>
  );
};

export default Knowmore;
