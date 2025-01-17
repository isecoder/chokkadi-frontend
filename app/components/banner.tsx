import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="bg-gradient-to-br from-orange-300 to-orange-500 text-white relative">
      <Image
        src="/banner.svg" // Use the actual path to your banner image
        alt="Temple Banner" // Updated alt text for better accessibility
        layout="responsive" // Adjusts to maintain aspect ratio and responsiveness
        width={1920} // Set the width according to your design
        height={1080} // Set the height according to your design
        className="w-screen max-h-[300px] md:max-h-[400px] lg:max-h-[400px]" // Sets max height for different screen sizes
      />
    </div>
  );
};

export default Banner;
