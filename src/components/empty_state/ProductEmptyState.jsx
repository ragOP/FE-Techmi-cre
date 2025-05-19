const ProductEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="60" fill="#F3F4F6" />
        <path
          d="M40 80c0-11 9-20 20-20s20 9 20 20"
          stroke="#A5B4FC"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="50" cy="55" rx="4" ry="6" fill="#A5B4FC" />
        <ellipse cx="70" cy="55" rx="4" ry="6" fill="#A5B4FC" />
        <path
          d="M54 70c2 2 10 2 12 0"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <h2 className="mt-6 text-2xl font-bold text-[#00008B]">
        No Products Found
      </h2>
      <p className="mt-2 text-gray-500 text-base">
        Sorry, we couldn’t find any products. <br />
      </p>
    </div>
  );
};

export default ProductEmptyState;
