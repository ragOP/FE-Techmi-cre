import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LazyLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white/40 backdrop-blur-md">
      <LoadingSpinner />

      <p className="mt-4 text-lg font-medium text-gray-600 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LazyLoader;
