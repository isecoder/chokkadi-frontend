"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";
import ImageModal from "../components/ImageModal";

interface ImageData {
  image_id: number;
  alt_text: string;
  public_url: string;
}

export default function Gallery(): JSX.Element {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchImages = useCallback(async (currentPage: number) => {
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(`/api/images/batch?limit=5&page=${currentPage}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Failed to load images");

      const data = await res.json();
      const newImages: ImageData[] = data?.data?.images || [];
      setHasMore(newImages.length > 0);
      setImages((prev) => [
        ...prev,
        ...newImages.filter(
          (newImage) => !prev.some((img) => img.image_id === newImage.image_id)
        ),
      ]);
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        Swal.fire({
          text: "The request took too long and was aborted. Please try again.",
          icon: "info",
          confirmButtonText: "Reload",
        }).then(() => location.reload());
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1 && hasMore) fetchImages(page);
  }, [page, hasMore, fetchImages]);

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
    <div className="relative px-4 md:px-8 lg:px-16">
      {loading && <LoadingSpinner />}

      {/* Centered Title for the Temple */}
      <div className="text-center mt-10 mb-4">
        <h1 className="text-3xl font-bold">Shrirama TEMPLE</h1>
      </div>

      {/* Image Gallery Section */}
      <h2 className="text-xl font-semibold mt-10 mb-4">PHOTOS</h2>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div
              key={image.image_id}
              className="relative w-full h-48 cursor-pointer overflow-hidden"
              onClick={() => openImageModal(index)}
            >
              <Image
                src={image.public_url}
                alt={image.alt_text}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
          <div
            ref={loaderRef}
            className="w-full h-10 flex justify-center items-center"
          />
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
    </div>
  );
}
