"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

const AddNewsUpdate: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [titleKannada, setTitleKannada] = useState<string>("");
  const [contentKannada, setContentKannada] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !titleKannada || !contentKannada) {
      Swal.fire("Error!", "Please fill in all fields.", "error");
      return;
    }

    const newNewsUpdate = {
      title,
      content,
      title_kannada: titleKannada,
      content_kannada: contentKannada,
    };

    setLoading(true);

    try {
      const response = await fetch("/api/news-updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNewsUpdate),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add news update");
      }

      Swal.fire("Success!", "News update added successfully.", "success");
      setTitle("");
      setContent("");
      setTitleKannada("");
      setContentKannada("");
      onAdd(); // Refresh the news updates list after adding
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to add news update",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Add News Update</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title (Kannada)</label>
          <input
            type="text"
            value={titleKannada}
            onChange={(e) => setTitleKannada(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content (Kannada)</label>
          <textarea
            value={contentKannada}
            onChange={(e) => setContentKannada(e.target.value)}
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
          {loading ? "Adding..." : "Add News Update"}
        </button>
      </form>
    </div>
  );
};

export default AddNewsUpdate;
