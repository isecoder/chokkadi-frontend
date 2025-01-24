"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

interface UploadImageProps {
  onImageUpload: (imageData: { imageId: number; publicUrl: string }) => void; // Callback to pass uploaded image data
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the selected file
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire(
        "No file selected!",
        "Please select an image file to upload.",
        "warning"
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      const data = await response.json();

      Swal.fire("Uploaded!", "Your image has been uploaded.", "success");

      // Extract relevant data from the response
      const uploadedImage = data.data; // Access `data` from the response
      const imageId = uploadedImage.image_id;
      const publicUrl = `/storage/${uploadedImage.file_path}`; // Construct public URL from file path

      // Pass uploaded image details to the parent component
      onImageUpload({ imageId, publicUrl });

      setSelectedFile(null);
      setImagePreview(null);
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to upload image",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-transparent p-4 rounded-md shadow-md border border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-center">Upload Image</h2>
      <div className="flex items-center mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white border border-gray-300 rounded-md p-2 w-full text-left"
        >
          {selectedFile ? selectedFile.name : "Choose file"}
        </label>
      </div>

      {imagePreview && (
        <div className="mb-4 relative w-full h-48">
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
