import React from "react";

const LazyLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white/40 backdrop-blur-md">
      {/* Animated Shimmer Effect */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-xl animate-pulse"></div>
        <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="animate-spin w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-medium text-gray-600 animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LazyLoader;
