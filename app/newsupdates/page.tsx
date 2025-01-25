"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
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
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );
  const router = useRouter();

  const fetchNewsUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news-updates`);
      if (!res.ok) throw new Error("Failed to load news updates");

      const { data: newsData } = await res.json();

      const formattedNews = newsData.map(
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
        }) => {
          const images = news.NewsImages.map((newsImage) => ({
            public_url: newsImage.Images.public_url,
            alt_text: newsImage.Images.alt_text,
          }));

          return {
            news_id: news.news_id,
            title: news.title,
            content: news.content,
            title_kannada: news.title_kannada,
            content_kannada: news.content_kannada,
            created_at: new Date(news.created_at).toLocaleDateString(),
            images,
          };
        }
      );

      setNewsUpdates(formattedNews);
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
    router.push(`/newsupdates/${news.news_id}`);
  };

  return (
    <div className="container mx-auto p-6 bg-[#FFFFCC]">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}
      {!loading && newsUpdates.length === 0 && !error && (
        <p className="text-center text-green-700 font-medium">
          No news updates available.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {newsUpdates.map((news) => (
          <div
            key={news.news_id}
            className="bg-[#FFFFE0] rounded-lg shadow-lg transition-transform transform hover:scale-105 p-6"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              {showKannada ? news.title_kannada : news.title}
            </h2>
            <p className="text-sm text-green-600 mb-2">
              Date: {news.created_at}
            </p>
            <p className="text-green-700 mb-4 line-clamp-3">
              {showKannada ? news.content_kannada : news.content}
            </p>
            {news.images.length > 0 && (
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={news.images[0].public_url}
                  alt={news.images[0].alt_text}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}
            <button
              className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-200 ease-in-out"
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
