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

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Shrirama Temple, Chokkadi</title> {/* ✅ Global title */}
        <meta
          name="description"
          content="Explore the rich heritage and spiritual essence of Shrirama Temple, Chokkadi."
        />
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
