import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface ImageData {
  image_id: number;
  alt_text: string;
  public_url: string;
}

interface ImageModalProps {
  isOpen: boolean;
  images: ImageData[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: "next" | "prev") => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [showEscapeMessage, setShowEscapeMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Show the escape message briefly when the modal opens or on double click
  const displayEscapeMessage = () => {
    setShowEscapeMessage(true);
    setFadeOut(false); // Reset fade out state if shown again
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade out after 2 seconds
      const fadeOutTimer = setTimeout(() => {
        setShowEscapeMessage(false);
        setFadeOut(false);
      }, 1500); // Duration of fade out
      return () => clearTimeout(fadeOutTimer);
    }, 2000); // Show for 2 seconds before starting to fade out
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (isOpen) {
      displayEscapeMessage();
    }
  }, [isOpen]);

  // Close modal on Escape key press and navigate with arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "q") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onNavigate("prev");
      }
      if (event.key === "ArrowRight") {
        onNavigate("next");
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const handleOverlayClick = (event: React.MouseEvent) => {
    // Close the modal when clicking on the overlay
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleImageDoubleClick = () => {
    displayEscapeMessage(); // Display the escape message on double-click
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full h-full p-0">
        <div
          className="relative w-full h-full"
          onDoubleClick={handleImageDoubleClick} // Add double-click handler
        >
          <Image
            src={currentImage.public_url}
            alt={currentImage.alt_text || "Image"}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Close button (X mark) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 focus:outline-none transition duration-200 ease-in-out"
        >
          <FontAwesomeIcon icon={faTimes} className="text-black text-2xl" />
        </button>

        {/* Fade-in message for escaping the modal */}
        {showEscapeMessage && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 
              bg-black bg-opacity-70 text-white text-sm p-2 rounded shadow-lg 
              transition-opacity duration-1500 ease-in-out 
              ${fadeOut ? "opacity-0" : "opacity-100"}`}
          >
            Press <strong>Q</strong> to escape
          </div>
        )}

        {/* Arrows positioned absolutely outside the image */}
        <div className="absolute inset-y-1/2 left-0 flex items-center justify-center transform -translate-y-1/2">
          <button
            onClick={() => onNavigate("prev")}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor:
                currentIndex === 0 ? "transparent" : "rgba(255, 255, 255, 0.3)",
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-white" />
          </button>
        </div>
        <div className="absolute inset-y-1/2 right-0 flex items-center justify-center transform -translate-y-1/2">
          <button
            onClick={() => onNavigate("next")}
            disabled={currentIndex === images.length - 1}
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              currentIndex === images.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            style={{
              backgroundColor:
                currentIndex === images.length - 1
                  ? "transparent"
                  : "rgba(255, 255, 255, 0.3)",
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
