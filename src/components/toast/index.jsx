import clsx from "clsx";
import React, { useState, useEffect } from "react";

const toastVariants = {
  default: "bg-white text-gray-900 border-gray-200",
  destructive: "bg-red-500 text-white border-red-600",
};

// Toast Component
const Toast = ({
  message,
  title,
  variant = "default",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed top-4 right-4 z-50 flex items-center justify-between p-4 rounded-md shadow-lg border transform transition-all",
        toastVariants[variant]
      )}
      style={{ animation: "slideIn 0.5s ease-out" }}
    >
      <div>
        {title && <p className="font-semibold text-sm">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast