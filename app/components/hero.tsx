"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images: string[] = [
  "/temple4.jpeg",
  "/hall.jpeg",
  "/img1.jpg",
  "/templeside.jpg",
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 2; // Number of images visible at a time

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-orange-200">
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
          }}
        >
          {[
            ...images,
            ...images.slice(0, visibleImages - 1), // Loop images to handle overflow smoothly
          ].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/2 h-96 p-2"
              style={{ flex: `0 0 calc(100% / ${visibleImages})` }}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          &#8250;
        </button>
      </div>
      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({
          length: images.length,
        }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
