"use client";

import { useEffect, useState, useRef,useCallback } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Share2, Copy, Facebook, Twitter, MessageCircle, X } from "lucide-react";

interface NewsImage {
  public_url: string;
  alt_text: string;
}

interface NewsUpdate {
  news_id: number;
  title: string;
  content: string;
  title_kannada?: string;
  content_kannada?: string;
  created_at: string;
  images: NewsImage[];
}

interface NewsDataResponse {
  data: {
    news_id: number;
    title: string;
    content: string;
    title_kannada?: string;
    content_kannada?: string;
    created_at: string;
    NewsImages: { Images: NewsImage[] }[]; 
  }[];
}

const SharePopup = ({
  url,
  text,
  onClose,
}: {
  url: string;
  text: string;
  onClose: () => void;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const shareOptions = [
    {
      name: "Copy Link",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(url);
        onClose();
      },
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank"),
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"),
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={popupRef} className="bg-white p-5 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Share this News</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>
        <div className="flex flex-col space-y-3">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.action();
                onClose();
              }}
              className="flex items-center p-2 border rounded-lg hover:bg-gray-100 transition"
            >
              <option.icon className="w-5 h-5 mr-3 text-blue-500" />
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function NewsUpdates(): JSX.Element {
  const [newsUpdates, setNewsUpdates] = useState<NewsUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareData, setShareData] = useState<{ url: string; text: string } | null>(null);

  const showKannada = useSelector((state: RootState) => state.locale.locale === "kn");
  const router = useRouter();

  const fetchNewsUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news-updates`);
      if (!res.ok) throw new Error("Failed to load news updates");

      const { data: newsData }: NewsDataResponse = await res.json();

      const formattedNews = newsData.map((news) => ({
        news_id: news.news_id,
        title: news.title,
        content: news.content,
        title_kannada: news.title_kannada,
        content_kannada: news.content_kannada,
        created_at: new Date(news.created_at).toLocaleDateString(),
        images: news.NewsImages.flatMap((newsImage) => newsImage.Images),
       
      }));

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

  const shareNews = async (news: NewsUpdate) => {
    const url = `${window.location.origin}/newsupdates/${news.news_id}`;
    const text = `${showKannada ? news.title_kannada : news.title} - Read more at ${url}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: news.title, text, url });
      } else {
        setShareData({ url, text });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Share failed:", error);
      } else {
        console.error("An unknown error occurred");
      }
    }
    
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-[var(--background)] font-serif">
      <div className="container mx-auto p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <LoadingSpinner />}
        {!loading && newsUpdates.length === 0 && !error && (
          <p className="text-center text-green-700 font-medium">No news updates available.</p>
        )}

        <div
          className={`mt-10 ${newsUpdates.length === 1 ? "flex justify-center items-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}`}
        >
          {newsUpdates.map((news) => (
            <div
              key={news.news_id}
              className="bg-[#FFFFE0] rounded-lg shadow-lg transition-transform transform hover:scale-105 p-6"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                {showKannada ? news.title_kannada : news.title}
              </h2>
              <p className="text-sm text-green-600 mb-2">Date: {news.created_at}</p>
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
      {shareData && <SharePopup url={shareData.url} text={shareData.text} onClose={() => setShareData(null)} />}
    </main>
  );
}
