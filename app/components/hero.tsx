"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images: string[] = [
  "/temple4.jpeg",
  "/hall.jpeg",
  "/img1.jpg",
  "/entrance.jpg",
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with the first actual slide (after duplicates)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleImages, setVisibleImages] = useState(2); // Default to showing 2 images (for desktop)

  // Extend the images for seamless looping
  const extendedImages = [
    ...images.slice(-visibleImages), // Add last `visibleImages` items at the beginning
    ...images,
    ...images.slice(0, visibleImages), // Add first `visibleImages` items at the end
  ];

  // Handle screen resizing to adapt the number of visible images
  useEffect(() => {
    const handleResize = () => {
      setVisibleImages(window.innerWidth < 768 ? 1 : 2); // Show 1 image on mobile, 2 on larger screens
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Reset position when reaching duplicates
  useEffect(() => {
    if (!isTransitioning) return;

    const transitionEndHandler = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex === 0) {
        setCurrentIndex(images.length); // Jump to the last actual slide
      } else if (currentIndex === extendedImages.length - visibleImages) {
        setCurrentIndex(visibleImages); // Jump to the first actual slide
      }
    }, 500); // Match this with the CSS transition duration

    return () => clearTimeout(transitionEndHandler);
  }, [currentIndex, isTransitioning, extendedImages.length, images.length]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full bg-gradient-to-b from-white to-orange-200">
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            isTransitioning ? "" : "transition-none"
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
          }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                visibleImages === 1 ? "w-full" : "w-1/2"
              } h-96 p-2`}
              style={{ flex: `0 0 calc(100% / ${visibleImages})` }}
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-full object-contain rounded-md"
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
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index + visibleImages)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex % images.length === index
                ? "bg-orange-500"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
