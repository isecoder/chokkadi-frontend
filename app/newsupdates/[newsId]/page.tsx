"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the import if needed
import LoadingSpinner from "../../components/LoadingSpinner"; // Ensure LoadingSpinner is correctly imported

interface NewsDetail {
  news_id: number;
  title: string;
  content: string;
  title_kannada?: string;
  content_kannada?: string;
  created_at: string;
}

const NewsDetail = () => {
  const { newsId } = useParams(); // Access the dynamic route parameter
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  ); // Track language from Redux state
  const router = useRouter(); // Use useRouter to handle navigation

  // Use useCallback to define the fetch function
  const fetchNewsDetail = useCallback(async () => {
    if (!newsId) return; // Check if newsId is available
    try {
      const res = await fetch(`/api/news-updates/${newsId}`);
      if (!res.ok) throw new Error("Failed to load news detail");

      const responseData = await res.json();
      setNewsDetail(responseData.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load news detail. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [newsId]); // Add newsId as a dependency

  useEffect(() => {
    fetchNewsDetail();
  }, [fetchNewsDetail]); // Include fetchNewsDetail in the dependency array

  const handleBackButtonClick = () => {
    router.back(); // Go back to the previous page
  };

  if (loading) return <LoadingSpinner />; // Show loading spinner while fetching
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={handleBackButtonClick}
        className="mb-4 text-orange-600 hover:underline"
      >
        &larr; Back
      </button>
      {newsDetail && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            {showKannada ? newsDetail.title_kannada : newsDetail.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Date: {new Date(newsDetail.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-lg">
            {showKannada ? newsDetail.content_kannada : newsDetail.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
