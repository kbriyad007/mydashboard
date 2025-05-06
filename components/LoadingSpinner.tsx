const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;