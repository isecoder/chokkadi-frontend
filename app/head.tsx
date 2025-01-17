// app/head.tsx
export default function Head() {
    return (
      <>
        <title>Shri Rama Temple</title>
        <meta
          name="description"
          content="Explore the Shri Rama Temple, Hariharapallathadka, a revered spiritual destination for peace, devotion, and cultural heritage in Karnataka."
        />
        <meta
          name="keywords"
          content="Shri Rama Temple, temple in Karnataka, religious site, chokkadi, pilgrimage, Hindu temple, Karnataka tourism"
        />
  
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Shri Rama Temple - A Sacred Destination" />
        <meta
          property="og:description"
          content="Discover the Shri Rama Temple, a spiritual landmark for peace and devotion, nestled in the scenic beauty of Karnataka."
        />
        <meta property="og:image" content="http://www.shriRama.org/logo.jpg" />
        <meta property="og:url" content="http://www.shriRama.org/" />
        <meta property="og:type" content="website" />
  
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shri Rama Temple - A Sacred Destination" />
        <meta
          name="twitter:description"
          content="Visit the Shri Rama Temple, a sacred space of devotion and cultural heritage in Karnataka."
        />
        <meta name="twitter:image" content="http://www.shriRama.org/logo.jpg" /> 
      </>
    );
  }
  