import { NextResponse } from "next/server";

const newsUpdates = [
  {
    news_id: 1,
    title: "Latest News in English",
    content: "This is the content for the latest news.",
    title_kannada: "ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿರುವ ತಾಜಾ ಸುದ್ದಿ",
    content_kannada: "ಇದು ತಾಜಾ ಸುದ್ದಿಯ ವಿಷಯವಾಗಿದೆ.",
    created_at: "2025-01-18T10:00:00Z",
  },
  {
    news_id: 2,
    title: "Another News Article",
    content: "This is another news article in English.",
    title_kannada: "ಇದೋ ಇನ್ನೊಂದು ಸುದ್ದಿ ಲೇಖನ",
    content_kannada: "ಇದು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿನ ಮತ್ತೊಂದು ಸುದ್ದಿ ಲೇಖನ.",
    created_at: "2025-01-17T09:00:00Z",
  },
];

export async function GET() {
  try {
    return NextResponse.json({ data: newsUpdates });
  } catch (error) {
    console.error("Error fetching news updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch news updates." },
      { status: 500 }
    );
  }
}
