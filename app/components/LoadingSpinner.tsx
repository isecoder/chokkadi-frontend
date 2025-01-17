'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // If not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-22 h-22">
        <Image
          src="/om.png"
          alt="Loading..."
          width={130} // Set an appropriate width
          height={130} // Set an appropriate height
          className="animate-pulse rounded-full"
          priority // Ensures the image loads as quickly as possible
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
