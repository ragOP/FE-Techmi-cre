import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/WebsiteInitialLoader.json"

const WebsiteLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* Lottie Animation */}
      <div className="w-64 h-64">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg font-medium text-white animate-pulse text-color-gray-500">
        Loading, please wait...
      </p>
    </div>
  );
};

export default WebsiteLoader;
