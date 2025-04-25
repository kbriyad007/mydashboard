const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
