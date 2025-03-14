"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";
import ImageModal from "../components/ImageModal";

interface GalleryImage {
  image_id: number;
  alt_text: string;
  file_path: string;
  public_url: string;
}

interface GalleryItem {
  gallery_id: number;
  title: string;
  Images: GalleryImage;
}

interface GalleryResponse {
  statusCode: number;
  message: string;
  data: GalleryItem[];
}

interface ImageData {
  image_id: number;
  alt_text: string;
  public_url: string;
  title: string;
}

export default function Gallery(): JSX.Element {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchGalleryData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch gallery data");
      const data: GalleryResponse = await res.json();

      // Transform the data to match ImageData type
      const newImages: ImageData[] = data.data.map((galleryItem) => ({
        image_id: galleryItem.Images.image_id,
        alt_text: galleryItem.Images.alt_text || "No description available",
        public_url: galleryItem.Images.public_url,
        title: galleryItem.title,
      }));

      setImages(newImages);
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: "Failed to load gallery data. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      }).then(() => location.reload());
    } finally {
      setLoading(false);
    }
  };

  const videos = [
    {
      title:
        " ಚೊಕ್ಕಾಡಿ ಜಾತ್ರೆ 2025 | ಶ್ರೀರಾಮ ದೇವರ ನೃತ್ಯ ಬಲಿ | Thidambu Nritham | Shrirama Temple |",
      video_url:
        "https://www.youtube.com/embed/HJkodXXXDkQ?si=AvZ-u_1fiRm7zxyC",
    },
   
  ];

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const openImageModal = (index: number) => {
    setCurrentIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (direction === "next" && currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative px-4 md:px-8 lg:px-16 mb-10 bg-yellow-100">
      {loading && <LoadingSpinner />}

      {/* Centered Title for the Temple */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold p-9 text-green-800">Shrirama Temple Chokkadi</h1>
      </div>

      {/* Image Gallery Section */}
      <h2 className="text-xl font-semibold mb-4 text-green-700">PHOTOS</h2>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.image_id}
              className="relative w-full h-48 cursor-pointer overflow-hidden group bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
              onClick={() => openImageModal(index)}
            >
              {/* Image */}
              <Image
                src={image.public_url}
                alt={image.alt_text}
                fill
                loading="lazy"
                className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
              {/* Title Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
                <p className="text-white text-lg font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg">
          No images found. Please check back later.
        </div>
      )}

      <ImageModal
        isOpen={isImageModalOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={closeImageModal}
        onNavigate={navigateImage}
      />
     <h2 className="text-xl font-semibold mt-10 mb-4 p-2">VIDEOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {videos.map((video, index) => (
          <div key={index} className="w-full h-64">
            <iframe
              src={video.video_url}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}