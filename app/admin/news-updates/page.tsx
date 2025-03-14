"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Swal from "sweetalert2";
import AddNewsUpdate from "../components/NewsUpdatesForm";
import Image from "next/image";

interface NewsUpdate {
  news_id: number;
  title: string;
  content: string;
  title_kannada?: string;
  content_kannada?: string;
  created_at: string;
  images: { public_url: string; alt_text: string }[];
}

export default function NewsUpdates(): JSX.Element {
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingNews, setEditingNews] = useState<NewsUpdate | null>(null);
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );

  const fetchNewsUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news-updates`);
      if (!res.ok) throw new Error("Failed to load news updates");

      const { data } = await res.json();

      const formattedData = data.map(
        (news: {
          news_id: number;
          title: string;
          content: string;
          title_kannada?: string;
          content_kannada?: string;
          created_at: string;
          NewsImages: {
            Images: { public_url: string; alt_text: string };
          }[];
        }) => ({
          news_id: news.news_id,
          title: news.title,
          content: news.content,
          title_kannada: news.title_kannada,
          content_kannada: news.content_kannada,
          created_at: new Date(news.created_at).toLocaleDateString(),
          images: news.NewsImages.map((newsImage) => ({
            public_url: newsImage.Images.public_url,
            alt_text: newsImage.Images.alt_text,
          })),
        })
      );

      setNewsUpdates(formattedData);
    } catch (err) {
      console.error(err);
      setError("Failed to load news updates. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNewsUpdate = async (newsId: number) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`/api/news-updates/${newsId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete news update");
        }

        setNewsUpdates((prevUpdates) =>
          prevUpdates.filter((update) => update.news_id !== newsId)
        );

        Swal.fire("Deleted!", "Your news update has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error instanceof Error ? error.message : "Failed to delete News",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchNewsUpdates();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <AddNewsUpdate onAdd={fetchNewsUpdates} />

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}
      {!loading && newsUpdates.length === 0 && !error && (
        <p className="text-center text-orange-500 font-medium">
          No news updates available.
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {newsUpdates.map((news) => (
          <div
            key={news.news_id}
            className="bg-white border-l-4 border-orange-500 shadow-lg rounded-lg p-6 max-h-80 overflow-hidden transition duration-300 transform hover:scale-105 flex flex-col justify-between"
          >
            <div className="relative max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              <h2 className="text-2xl font-semibold text-orange-600 mb-3">
                {showKannada ? news.title_kannada : news.title}
              </h2>
              <p className="text-gray-700 mb-4">
                {showKannada ? news.content_kannada : news.content}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium mt-2">
              Date: {news.created_at}
            </p>
            {news.images.map((image, idx) => (
              <div key={idx} className="relative w-full h-40 mb-4">
                <Image
                  src={image.public_url}
                  alt={image.alt_text}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
            <div className="flex gap-2">
              <button
                onClick={() => deleteNewsUpdate(news.news_id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setEditingNews(news)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingNews && (
        <AddNewsUpdate
          news={editingNews}
          onAdd={fetchNewsUpdates}
          onClose={() => setEditingNews(null)}
        />
      )}
    </div>
  );
}
