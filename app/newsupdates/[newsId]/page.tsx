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

const NewsDetail = () => {
  const { newsId } = useParams();
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );
  const router = useRouter();

  const fetchNewsDetail = useCallback(async () => {
    if (!newsId) return;
    try {
      const res = await fetch(`/api/news-updates/${newsId}`);
      if (!res.ok) throw new Error("Failed to load news detail");

      const { data } = await res.json();

      const images = data.NewsImages.map(
        (newsImage: { Images: { public_url: string; alt_text: string } }) => ({
          public_url: newsImage.Images.public_url,
          alt_text: newsImage.Images.alt_text,
        })
      );

      setNewsDetail({
        ...data,
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

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeZoom = () => {
    setCurrentImageIndex(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (currentImageIndex !== null && newsDetail?.images) {
      const totalImages = newsDetail.images.length;
      if (direction === "prev") {
        setCurrentImageIndex(
          (currentImageIndex - 1 + totalImages) % totalImages
        );
      } else {
        setCurrentImageIndex((currentImageIndex + 1) % totalImages);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-green-600 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6 bg-[#FFFFCC]">
      <button
        onClick={handleBackButtonClick}
        className="mb-4 px-4 py-2 text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-md"
      >
        &larr; Back
      </button>
      {newsDetail && (
        <div className="bg-[#FFFFE0] rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            {showKannada ? newsDetail.title_kannada : newsDetail.title}
          </h1>
          <p className="text-sm text-green-600 mb-4">
            Date: {new Date(newsDetail.created_at).toLocaleDateString()}
          </p>
          <p className="text-green-700 text-lg mb-4">
            {showKannada ? newsDetail.content_kannada : newsDetail.content}
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            {newsDetail.images.map((image, idx) => (
              <div
                key={idx}
                className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-hidden rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => handleImageClick(idx)}
              >
                <Image
                  src={image.public_url}
                  alt={image.alt_text}
                  width={500}
                  height={300}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zoomed Image Modal */}
      {currentImageIndex !== null && newsDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <button
            className="absolute top-4 right-4 text-white bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded-lg shadow-md"
            onClick={closeZoom}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded-lg shadow-md"
            onClick={() => navigateImage("prev")}
          >
            &larr;
          </button>
          <div className="relative max-w-3xl w-full p-4">
            <Image
              src={newsDetail.images[currentImageIndex].public_url}
              alt={newsDetail.images[currentImageIndex].alt_text}
              layout="responsive"
              width={9}
              height={16}
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <button
            className="absolute right-4 text-white bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded-lg shadow-md"
            onClick={() => navigateImage("next")}
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
