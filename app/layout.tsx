import { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import FooterWrapper from "./components/footer-wrapper";
import ReduxProvider from "./components/redux-provider"; // ✅ Import Client Wrapper for Redux

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ✅ Add Open Graph metadata for WhatsApp, Twitter, and Facebook preview
export async function generateMetadata(): Promise<Metadata> {
  const title = "Shrirama Temple, Chokkadi";
  const description =
    "Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi.";
  const url = process.env.NEXT_PUBLIC_URL; // ✅ Corrected from NEXT_PUBLIC_SITE_URL
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/d13f23e6-fc07-47b9-9520-7cbdaf6af92c.webp`; // ✅ Fixed

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: imageUrl }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
          `}
        </Script>

        {/* Disable right-click, image download, and content copy */}
        <Script id="disable-actions" strategy="afterInteractive">
          {`
            document.addEventListener('contextmenu', (e) => e.preventDefault());
            document.addEventListener('keydown', (e) => {
              if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
                e.preventDefault();
              }
            });
            document.addEventListener('copy', (e) => e.preventDefault());
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {" "}
          {/* ✅ Wrap everything inside Redux Provider */}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <FooterWrapper />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
