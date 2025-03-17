import React from "react";
import FallbackImage from "../../../assets/not_found.png";

const Image = ({ src, alt, css }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${css}`}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FallbackImage;
      }}
    />
  );
};

export default Image;
