import React, { useState } from "react";
import   AnimationSlider  from "../../../../common/animations"; 
import insurance_new_pdp from "../../../../../assets/services/para/insurance_new_pdp.svg"; 
import {isArrayWithValues} from "../../../../../utils/array/isArrayWithValues";

const Knowmore = ({sliderImages}) => {
  // console.log(sliderImages);
  // const [sliderData, setSliderData] = useState([
  //   { id: 1, imageSrc: insurance_new_pdp, title: "Product 1" },
  //   { id: 2, imageSrc: insurance_new_pdp, title: "Product 2" },
  //   { id: 3, imageSrc: insurance_new_pdp, title: "Product 3" },
  //   { id: 4, imageSrc: insurance_new_pdp, title: "Product 4" },
  //   { id: 5, imageSrc: insurance_new_pdp, title: "Product 5" },
  //   { id: 6, imageSrc: insurance_new_pdp, title: "Product 6" }
  // ]);

  return (
    <div className="mt-20">
      <AnimationSlider>
        {Array.isArray(sliderImages) && isArrayWithValues(sliderImages) &&
        sliderImages.map((item, index) => (
          <div key={index}>
            <div className="product-card">
              <img src={item} alt="Health Insurance Banner" className="w-full" />
            </div>
          </div>
        ))}
      </AnimationSlider>
    </div>
  );
};

export default Knowmore;
