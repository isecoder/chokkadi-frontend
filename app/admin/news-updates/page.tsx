"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the import if needed
import Swal from "sweetalert2";
import AddNewsUpdate from "../components/NewsUpdatesForm"; // Import the AddNewsUpdate component

interface NewsUpdate {
  news_id: number;
  title: string;
  content: string;
  title_kannada?: string;
  content_kannada?: string;
  created_at: string;
}

export default function NewsUpdates(): JSX.Element {
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );

  const fetchNewsUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/newsupdates`);
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
        }) => ({
          news_id: news.news_id,
          title: news.title,
          content: news.content,
          title_kannada: news.title_kannada,
          content_kannada: news.content_kannada,
          created_at: new Date(news.created_at).toLocaleDateString(),
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
        const response = await fetch(`/api/newsupdates/${newsId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete news update");
        }

        // Update the local state to remove the deleted news update
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
      <AddNewsUpdate onAdd={fetchNewsUpdates} />{" "}
      {/* Include the AddNewsUpdate component */}
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
            <button
              onClick={() => deleteNewsUpdate(news.news_id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <style jsx>{`
        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        /* Hide scrollbar for other browsers */
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: white transparent; /* Firefox thumb color */
        }
      `}</style>
    </div>
  );
}
