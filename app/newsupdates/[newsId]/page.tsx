"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../components/LoadingSpinner";
import Image from "next/image";

interface NewsDetail {
  news_id: number;
  title: string;
  content: string;
  title_kannada?: string;
  content_kannada?: string;
  created_at: string;
  images: { public_url: string; alt_text: string }[];
}

interface NewsImage {
  image_id: number;
}

interface ImageData {
  image_id: number;
  public_url: string;
  alt_text: string;
}

const NewsDetail = () => {
  const { newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );
  const router = useRouter();

  const fetchNewsDetail = useCallback(async () => {
    if (!newsId) return;
    try {
      const res = await fetch(`/api/news-updates/${newsId}`);
      if (!res.ok) throw new Error("Failed to load news detail");

      const responseData = await res.json();
      const imageRes = await fetch("/api/images/batch");
      if (!imageRes.ok) throw new Error("Failed to load images");

      const { data: imageData } = await imageRes.json();
      const images = responseData.data.NewsImages.map(
        (newsImage: NewsImage) => {
          const matchedImage = imageData.images.find(
            (img: ImageData) => img.image_id === newsImage.image_id
          );
          return {
            public_url: matchedImage?.public_url || "",
            alt_text: matchedImage?.alt_text || "",
          };
        }
      );

      setNewsDetail({
        ...responseData.data,
        images,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load news detail. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [newsId]);

  useEffect(() => {
    fetchNewsDetail();
  }, [fetchNewsDetail]);

  const handleBackButtonClick = () => {
    router.back();
  };

  if (loading) return <LoadingSpinner />;
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
          <p className="text-gray-700 text-lg mb-4">
            {showKannada ? newsDetail.content_kannada : newsDetail.content}
          </p>
          {newsDetail.images.map((image, idx) => (
            <div key={idx} className="relative w-half h-60 mb-4">
              <Image
                src={image.public_url}
                alt={image.alt_text}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
