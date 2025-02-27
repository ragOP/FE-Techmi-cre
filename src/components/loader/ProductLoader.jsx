import React from "react";

const ProductLoader = () => {
  const loaderItems = [1, 2, 3];
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-8">
      {loaderItems.map((item) => (
        <div key={item} className="animate-pulse flex flex-col space-y-4 w-48">
          <div className="rounded-lg bg-gray-300 h-48 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductLoader;