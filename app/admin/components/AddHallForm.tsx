"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import UploadImage from "../components/UploadImage"; // Ensure you have the UploadImage component

interface AddHallProps {
  onAdd: () => void; // Callback to refresh the hall list
}

const AddHall: React.FC<AddHallProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameKannada, setNameKannada] = useState<string>("");
  const [descriptionKannada, setDescriptionKannada] = useState<string>("");
  const [imageIds, setImageIds] = useState<number[]>([]); // Store multiple image IDs
  const [loading, setLoading] = useState<boolean>(false);

  // Handle image upload and add the image ID to the list
  const handleImageUpload = (imageData: {
    imageId: number;
    publicUrl: string;
  }) => {
    setImageIds((prev) => [...prev, imageData.imageId]); // Add the new image ID to the array
    Swal.fire(
      "Success!",
      `Image uploaded successfully. Image ID: ${imageData.imageId}`,
      "success"
    );
  };

  // Handle removing an image ID from the list
  const handleRemoveImageId = (imageId: number) => {
    setImageIds((prev) => prev.filter((id) => id !== imageId)); // Remove the selected image ID
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !nameKannada || !descriptionKannada) {
      Swal.fire("Error!", "Please fill in all fields.", "error");
      return;
    }

    if (imageIds.length === 0) {
      Swal.fire(
        "Error!",
        "Please upload at least one image to proceed.",
        "error"
      );
      return;
    }

    const newHall = {
      name,
      description,
      name_kannada: nameKannada,
      description_kannada: descriptionKannada,
      imageIds, // Include the list of image IDs
    };

    setLoading(true);

    try {
      const response = await fetch("/api/halls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHall),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add hall");
      }

      Swal.fire("Success!", "Hall added successfully.", "success");

      // Reset the form
      setName("");
      setDescription("");
      setNameKannada("");
      setDescriptionKannada("");
      setImageIds([]);
      onAdd(); // Refresh the hall list
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to add hall",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Hall</h2>

      {/* Image Upload Section */}
      <UploadImage onImageUpload={handleImageUpload} />

      {/* Display Image IDs */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Uploaded Image IDs</label>
        {imageIds.length > 0 ? (
          <ul className="list-disc list-inside bg-gray-100 p-3 rounded-md">
            {imageIds.map((id) => (
              <li key={id} className="flex justify-between items-center mb-2">
                <span>Image ID: {id}</span>
                <button
                  onClick={() => handleRemoveImageId(id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No images uploaded yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name (Kannada)</label>
          <input
            type="text"
            value={nameKannada}
            onChange={(e) => setNameKannada(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Description (Kannada)
          </label>
          <textarea
            value={descriptionKannada}
            onChange={(e) => setDescriptionKannada(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Hall"}
        </button>
      </form>
    </div>
  );
};

export default AddHall;
