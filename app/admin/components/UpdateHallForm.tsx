"use client";

import { useState } from "react";
import Swal from "sweetalert2";

interface Hall {
  id: number;
  name: string;
  description: string;
  base_price: number;
  name_kannada?: string;
  description_kannada?: string;
}

interface UpdateHallFormProps {
  hall: Hall;
  onUpdate: (updatedHall: Hall) => void;
  onClose: () => void;
}

const UpdateHallForm = ({
  hall,
  onUpdate,
  onClose,
}: UpdateHallFormProps): JSX.Element => {
  const [name, setName] = useState(hall.name);
  const [description, setDescription] = useState(hall.description);
  const [basePrice, setBasePrice] = useState(hall.base_price);
  const [nameKannada, setNameKannada] = useState(hall.name_kannada || "");
  const [descriptionKannada, setDescriptionKannada] = useState(
    hall.description_kannada || ""
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/halls/${hall.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          base_price: basePrice,
          name_kannada: nameKannada,
          description_kannada: descriptionKannada,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update hall");
      }

      const updatedHall = await res.json();
      onUpdate(updatedHall); // Update the parent component
      Swal.fire(
        "Updated!",
        "The hall has been updated successfully.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to update hall",
        "error"
      );
    } finally {
      setLoading(false);
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Hall</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Base Price
            </label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name (Kannada)
            </label>
            <input
              type="text"
              value={nameKannada}
              onChange={(e) => setNameKannada(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description (Kannada)
            </label>
            <textarea
              value={descriptionKannada}
              onChange={(e) => setDescriptionKannada(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHallForm;
