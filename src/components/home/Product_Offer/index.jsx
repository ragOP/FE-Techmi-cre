import React, { useEffect, useState } from "react";

const Index = ({ homeConfig, isLoading }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (homeConfig) {
      setImages(
        [
          homeConfig?.banner1,
          homeConfig?.banner2,
          homeConfig?.banner3,
          homeConfig?.banner4,
          homeConfig?.banner5,
        ].filter(Boolean)
      );
    }
  }, [homeConfig]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <div className="lg:col-span-1">
        {isLoading ? (
          <div className="w-full h-[500px] bg-gray-300 rounded-lg animate-pulse"></div>
        ) : images.length > 0 ? (
          <img
            src={images[0]}
            alt="Featured Banner"
            className="rounded-lg w-full h-full max-h-[500px] object-cover"
          />
        ) : (
          <div className="w-full h-[500px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {isLoading
          ? // Skeleton Loader for Right Side Images
            Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[240px] bg-gray-300 rounded-lg animate-pulse"
                ></div>
              ))
          : images.slice(1).map((src, index) => (
              <div key={index} className="w-full h-full">
                <img
                  src={src}
                  alt={`Banner ${index + 2}`}
                  className="rounded-lg w-full h-full max-h-[240px] object-cover"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Index;
