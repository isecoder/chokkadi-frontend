// app/api/sitemap/route.tsx
import { NextResponse } from 'next/server';

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Home Page -->
    <url>
      <loc>http://www.shriRama.org/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <!-- About Page -->
    <url>
      <loc>http://www.shriRama.org/about</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>

    <!-- Sevas Page -->
    <url>
      <loc>http://www.shriRama.org/sevas</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>

    <!-- Donation Page -->
    <url>
      <loc>http://www.shriRama.org/donate</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>

    <!-- Gallery Page -->
    <url>
      <loc>http://www.shriRama.org/gallery</loc>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>

    <!-- Contact Page -->
    <url>
      <loc>http://www.shriRama.org/contact</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  </urlset>`;

  return new NextResponse(sitemap, { headers: { 'Content-Type': 'application/xml' } });
}
