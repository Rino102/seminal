import React from "react";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4 h-60 w-full">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    </div>
  );
}
