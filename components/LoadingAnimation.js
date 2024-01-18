import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <img src="load.gif" alt="Loading Pokeball" className="w-10" />
        <span className="ml-2">Loading...</span>
      </div>
  );
};

export default LoadingAnimation;