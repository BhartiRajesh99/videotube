import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="size-6 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
    </div>
  );
}