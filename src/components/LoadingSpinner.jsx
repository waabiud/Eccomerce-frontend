import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative">
        {/* Spinner background circle */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full" />
        
        {/* Animated spinning part */}
        <div className="w-20 h-20 border-4 border-t-blue-500 border-transparent animate-spin rounded-full absolute top-0 left-0" />

        {/* Accessible label for screen readers */}
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium sr-only">
          Loading
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
