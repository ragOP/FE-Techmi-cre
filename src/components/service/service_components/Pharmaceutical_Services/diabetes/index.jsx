import React, { useState } from "react";
import super6_web_new from "../../../../../assets/services/para/super6_web_new.svg"; 

const Diabetes = () => {
  const [imageSrc, setImageSrc] = useState(super6_web_new);
  return (
    <div className="w-full mt-10">
      <img src={imageSrc} alt="Diabetes Care" className="w-full h-96" />
    </div>
  );
};

export default Diabetes;
