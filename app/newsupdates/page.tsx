"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the import if needed
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

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
  const showKannada = useSelector((state: RootState) => state.locale.locale === "kn");
  const router = useRouter(); // Initialize router

  const fetchNewsUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/newsupdates`);
      if (!res.ok) throw new Error("Failed to load news updates");

      const { data } = await res.json();
      const formattedData = data.map((news: {
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
      }));

      setNewsUpdates(formattedData);
    } catch (err) {
      console.error(err);
      setError("Failed to load news updates. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsUpdates();
  }, []);

  const openNewsDetail = (news: NewsUpdate) => {
    // Navigate to the news detail page in the same tab
    router.push(`/newsupdates/${news.news_id}`); // Ensure this URL structure matches your routing
  };

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}
      {!loading && newsUpdates.length === 0 && !error && (
        <p className="text-center text-orange-500 font-medium">No news updates available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {newsUpdates.map((news) => (
          <div
            key={news.news_id}
            className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 p-6"
          >
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              {showKannada ? news.title_kannada : news.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">Date: {news.created_at}</p>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {showKannada ? news.content_kannada : news.content}
            </p>
            <button
              className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-200 ease-in-out"
              onClick={() => openNewsDetail(news)} 
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
