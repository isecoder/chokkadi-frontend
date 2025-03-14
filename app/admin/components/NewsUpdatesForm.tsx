"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UploadImage from "../components/UploadImage";

interface NewsUpdate {
  news_id?: number;
  title: string;
  content: string;
  title_kannada?: string;
  content_kannada?: string;
  imageIds?: number[];
}

interface AddNewsUpdateProps {
  news?: NewsUpdate; // Optional for editing existing news
  onAdd: () => void; // Callback to refresh news updates
  onClose?: () => void; // Callback to close the modal when editing
}

const AddNewsUpdate: React.FC<AddNewsUpdateProps> = ({
  news,
  onAdd,
  onClose,
}) => {
  const [title, setTitle] = useState<string>(news?.title || "");
  const [content, setContent] = useState<string>(news?.content || "");
  const [titleKannada, setTitleKannada] = useState<string>(
    news?.title_kannada || ""
  );
  const [contentKannada, setContentKannada] = useState<string>(
    news?.content_kannada || ""
  );
  const [imageIds, setImageIds] = useState<number[]>(news?.imageIds || []);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (news) {
      setTitle(news.title);
      setContent(news.content);
      setTitleKannada(news.title_kannada || "");
      setContentKannada(news.content_kannada || "");
      setImageIds(news.imageIds || []);
    }
  }, [news]);

  const handleImageUpload = (imageData: {
    imageId: number;
    publicUrl: string;
  }) => {
    setImageIds((prev) => [...prev, imageData.imageId]);
    Swal.fire("Success!", `Image uploaded successfully.`, "success");
  };

  const handleRemoveImageId = (imageId: number) => {
    setImageIds((prev) => prev.filter((id) => id !== imageId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !titleKannada || !contentKannada) {
      Swal.fire("Error!", "Please fill in all fields.", "error");
      return;
    }

    // Require image only for new news (POST), not updates (PUT)
    if (!news && imageIds.length === 0) {
      Swal.fire("Error!", "Please upload at least one image.", "error");
      return;
    }

    const newsUpdate = {
      title,
      content,
      title_kannada: titleKannada,
      content_kannada: contentKannada,
      imageIds: imageIds.length > 0 ? imageIds : news?.imageIds || [], // Keep existing images if none are uploaded
    };

    setLoading(true);

    try {
      const method = news ? "PUT" : "POST";
      const url = news
        ? `/api/news-updates/update/${news.news_id}`
        : "/api/news-updates";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsUpdate),
      });

      if (!response.ok) {
        throw new Error(
          news ? "Failed to update news update" : "Failed to add news update"
        );
      }

      Swal.fire(
        "Success!",
        news
          ? "News update updated successfully."
          : "News update added successfully.",
        "success"
      );

      setTitle("");
      setContent("");
      setTitleKannada("");
      setContentKannada("");
      setImageIds([]);
      onAdd();
      if (onClose) onClose();
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "An error occurred.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">
        {news ? "Edit News Update" : "Add News Update"}
      </h2>

      <UploadImage onImageUpload={handleImageUpload} />

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
          <p className="text-sm text-gray-500">
            {news ? "No new images uploaded." : "No images uploaded yet."}
          </p>
        )}
      </div>

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
        <div className="flex justify-end gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {loading
              ? news
                ? "Updating..."
                : "Adding..."
              : news
              ? "Update"
              : "Add News Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewsUpdate;
