"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Share2, Copy, Facebook, Twitter, MessageCircle } from "lucide-react";

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

      const formattedNews = newsData.map((news: any) => {
        const images = news.NewsImages.map((newsImage: any) => ({
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
      });

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

  const shareNews = (news: NewsUpdate) => {
    const url = `${window.location.origin}/newsupdates/${news.news_id}`;
    const text = `${showKannada ? news.title_kannada : news.title} - Read more at ${url}`;

    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: text,
        url: url,
      }).catch(console.error);
    } else {
      const shareOptions = [
        { name: "Copy Link", icon: Copy, action: () => navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard!")) },
        { name: "WhatsApp", icon: MessageCircle, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank") },
        { name: "Twitter", icon: Twitter, action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank") },
        { name: "Facebook", icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank") },
      ];
      
      alert("Choose an option to share");
      shareOptions.forEach(option => {
        if (confirm(`Share via ${option.name}?`)) {
          option.action();
        }
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-[var(--background)] font-serif">
      <div className="container mx-auto p-6 ">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <LoadingSpinner />}
        {!loading && newsUpdates.length === 0 && !error && (
          <p className="text-center text-green-700 font-medium">
            No news updates available.
          </p>
        )}

        <div
          className={`mt-10 ${
            newsUpdates.length === 1
              ? "flex justify-center items-center"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          }`}
        >
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
              <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                {news.images.length > 0 && (
                  <Image
                    src={news.images[0].public_url}
                    alt={news.images[0].alt_text}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                    style={{ aspectRatio: "9 / 16" }}
                  />
                )}
              </div>
              <p className="text-green-700 mb-4 line-clamp-3">
                {showKannada ? news.content_kannada : news.content}
              </p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-200 ease-in-out"
                  onClick={() => openNewsDetail(news)}
                >
                  Read More
                </button>
                <button
                  className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
                  onClick={() => shareNews(news)}
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
