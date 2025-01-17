"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images: string[] = [
  "/hall.jpeg",
  "/temple4.jpeg",
 "/img1.jpg"
];

const ImageSlider: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const transitionSlide = useCallback(
    (nextPage: number) => {
      if (isAnimating) return; // Prevent rapid clicking
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500); // Animation delay
      setCurrentPage(nextPage);
    },
    [isAnimating]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      transitionSlide((currentPage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage, transitionSlide]);

  const handlePrevPage = () =>
    transitionSlide((currentPage - 1 + images.length) % images.length);
  const handleNextPage = () =>
    transitionSlide((currentPage + 1) % images.length);

  return (
    <div className="relative flex flex-col w-full bg-gradient-to-b from-white to-orange-200">
      {/* Responsive heights for different screen sizes */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[350px] overflow-hidden">
        <div className="transition-transform duration-500 ease-in-out">
          <Image
            src={images[currentPage]}
            alt={`Image ${currentPage + 1}`}
            fill
            sizes="100vw"
            className="object-contain" // Ensures the image covers the container proportionally
            priority
          />
        </div>
        {/* Left arrow */}
        <div
          onClick={handlePrevPage}
          className="absolute inset-y-1/2 left-4 text-white text-2xl cursor-pointer hover:text-orange-500"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        {/* Right arrow */}
        <div
          onClick={handleNextPage}
          className="absolute inset-y-1/2 right-4 text-white text-2xl cursor-pointer hover:text-orange-500"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
        {/* Dots navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => transitionSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentPage ? "bg-orange-500" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
