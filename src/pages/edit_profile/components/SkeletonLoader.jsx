const SkeletonLoader = () => (
  <div className="max-w-xl mx-auto p-6 animate-pulse space-y-4">
    <div className="h-8 bg-gray-200 rounded" />
    {[...Array(3)].map((_, i) => (
      <div key={i}>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;