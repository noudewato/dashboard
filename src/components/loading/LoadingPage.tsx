import React from 'react';
import "./loading.css"

const LoadingPage = () => {
  return (
  <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
  </div>
  );
};

export default LoadingPage;
