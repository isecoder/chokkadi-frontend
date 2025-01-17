"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

const AddSeva: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameKannada, setNameKannada] = useState<string>(""); // For Kannada name
  const [descriptionKannada, setDescriptionKannada] = useState<string>(""); // For Kannada description
  const [basePrice, setBasePrice] = useState<number | string>(0); // Start as 0 but can also be a string for controlled input
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate inputs
    if (
      !name ||
      !description ||
      !nameKannada ||
      !descriptionKannada ||
      Number(basePrice) <= 0
    ) {
      Swal.fire("Error!", "Please fill in all fields correctly.", "error");
      return;
    }

    const newSeva = {
      name,
      description,
      name_kannada: nameKannada, // Include Kannada name
      description_kannada: descriptionKannada, // Include Kannada description
      base_price: Number(basePrice), // Ensure base_price is a number
    };

    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/sevas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSeva),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add seva");
      }

      Swal.fire({
        title: "Success!",
        text: "Seva added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Refresh the page after the user clicks OK
        window.location.reload();
      });

      // Reset form fields after successful submission
      setName("");
      setDescription("");
      setNameKannada(""); // Reset Kannada name
      setDescriptionKannada(""); // Reset Kannada description
      setBasePrice(0); // Reset base price
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to add seva",
        "error"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Seva</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Base Price</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)} // Allow for string input and convert on submit
            className="border border-gray-300 rounded-md p-2 w-full"
            min="0"
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
          {loading ? "Adding..." : "Add Seva"}
        </button>
      </form>
    </div>
  );
};

export default AddSeva;
