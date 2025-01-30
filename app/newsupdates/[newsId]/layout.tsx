import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsId: string }>;
}): Promise<Metadata> {
  const { newsId } = await params; // ✅ Await params to avoid Next.js 15 async error

  if (!newsId) {
    return {
      title: "Shrirama Temple, Chokkadi",
      description:
        "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.",
      openGraph: {
        title: "Shrirama Temple, Chokkadi",
        description:
          "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.",
        url: `/newsupdates/unknown`,
        images: [{ url: `/default-og-image.webp` }], // ✅ Uses relative path
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Shrirama Temple, Chokkadi",
        description:
          "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.",
        images: [`/default-og-image.webp`], // ✅ Uses relative path
      },
    };
  }

  try {
    // ✅ Fetch data from the API (using a proxy path)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/news-updates/${newsId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok)
      throw new Error(`Failed to fetch news details for newsId: ${newsId}`);

    const { data } = await res.json();

    const title = data.title || "Shrirama Temple, Chokkadi";
    const description =
      data.content?.substring(0, 150) ||
      "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.";

    // ✅ Use the first image if available, otherwise use a fallback image
    const imageUrl =
      data.NewsImages?.length > 0
        ? data.NewsImages[0].Images.public_url
        : `/default-og-image.webp`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/newsupdates/${newsId}`,
        images: [{ url: imageUrl }],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    return {
      title: "Shrirama Temple, Chokkadi",
      description:
        "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.",
      openGraph: {
        title: "Shrirama Temple, Chokkadi",
        description:
          "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.",
        url: `/newsupdates/${newsId}`,
        images: [{ url: `/default-og-image.webp` }], // ✅ Uses relative path
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Shrirama Temple, Chokkadi",
        description:
          "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.",
        images: [`/default-og-image.webp`], // ✅ Uses relative path
      },
    };
  }
}

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
