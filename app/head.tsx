import Head from "next/head";

export default function SEOHead() {
  return (
    <Head>
      <title>Shrirama Temple</title>
      <meta
        name="description"
        content="Explore the Shrirama Temple, Chokkadi, a revered spiritual destination for peace, devotion, and cultural heritage in Karnataka."
      />
      <meta
        name="keywords"
        content="Shrirama Temple, temple in Karnataka, religious site, chokkadi, pilgrimage, Hindu temple, Karnataka tourism"
      />
      
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    
      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content="Shrirama Temple - A Sacred Destination" />
      <meta
        property="og:description"
        content="Discover the Shrirama Temple, a spiritual landmark for peace and devotion, nestled in the scenic beauty of Karnataka."
      />
      <meta property="og:image" content="https://www.srtchokkadi.org/logo.jpg" />
      <meta property="og:url" content="https://www.srtchokkadi.org/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shrirama Temple - A Sacred Destination" />
      <meta
        name="twitter:description"
        content="Visit the Shrirama Temple, a sacred space of devotion and cultural heritage in Karnataka."
      />
      <meta name="twitter:image" content="https://www.srtchokkadi.org/logo.jpg" />
    </Head>
  );
}
