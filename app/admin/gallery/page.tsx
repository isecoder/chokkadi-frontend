"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";
import ImageModal from "../../components/ImageModal";
import UploadImage from "../components/UploadImage";

interface GalleryResponse {
  gallery_id: number;
  title: string;
  Images: {
    image_id: number;
    public_url: string;
    alt_text: string;
  };
}

interface ImageData {
  gallery_id: number;
  title: string;
  image_id: number;
  public_url: string;
  alt_text: string;
}

export default function Gallery(): JSX.Element {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newGalleryTitle, setNewGalleryTitle] = useState("");
  const [newImageId, setNewImageId] = useState("");

  // Fetch all gallery images
  const fetchImages = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/gallery`, { cache: "no-store" });

      if (!res.ok) throw new Error("Failed to load gallery data");

      const data: { data: GalleryResponse[] } = await res.json();

      const newImages: ImageData[] = data.data.map((gallery) => ({
        gallery_id: gallery.gallery_id,
        title: gallery.title,
        image_id: gallery.Images.image_id,
        public_url: gallery.Images.public_url,
        alt_text: gallery.Images.alt_text,
      }));

      setImages(newImages);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      Swal.fire({
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Retry",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Handle Image Upload
  const handleImageUpload = (imageData: {
    imageId: number;
    publicUrl: string;
  }) => {
    setNewImageId(imageData.imageId.toString()); // Automatically set the image ID
    Swal.fire(
      "Success!",
      `Image uploaded. ID: ${imageData.imageId}`,
      "success"
    );
  };

  // Create a new gallery
  const createGallery = async () => {
    if (!newGalleryTitle || !newImageId) {
      Swal.fire({
        text: "Please provide both a title and image ID to create a gallery.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      const response = await fetch(`/api/gallery/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newGalleryTitle,
          imageId: Number(newImageId),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create gallery");
      }

      Swal.fire("Success!", "Gallery created successfully.", "success");

      // Refresh the page after gallery creation
      window.location.reload();
    } catch (error: unknown) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to create gallery",
        "error"
      );
    }
  };

  // Delete a gallery
  const deleteGallery = async (galleryId: number) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the gallery and its associated image. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`/api/gallery/delete/${galleryId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete gallery");
        }

        // Update the local state to remove the deleted gallery
        setImages((prevImages) =>
          prevImages.filter((image) => image.gallery_id !== galleryId)
        );

        Swal.fire("Deleted!", "Your gallery has been deleted.", "success");
      } catch (error: unknown) {
        Swal.fire(
          "Error!",
          error instanceof Error ? error.message : "Failed to delete gallery",
          "error"
        );
      }
    }
  };

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

      {/* Upload Image Section */}
      <UploadImage onImageUpload={handleImageUpload} />

      {/* Create Gallery Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-lg font-semibold">Create New Gallery</h2>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            type="text"
            placeholder="Gallery Title"
            value={newGalleryTitle}
            onChange={(e) => setNewGalleryTitle(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Image ID"
            value={newImageId}
            disabled // Make the input field read-only
            className="border rounded px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <button
            onClick={createGallery}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Create Gallery
          </button>
        </div>
      </div>

      {/* Image Gallery Section */}
      <h2 className="text-xl font-semibold mt-10 mb-4">PHOTOS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening
                deleteGallery(image.gallery_id); // Call deleteGallery function
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

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
