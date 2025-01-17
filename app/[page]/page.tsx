// app/[page]/page.tsx
'use client'
import { useRouter } from 'next/router';

const pageContent: { [key: string]: string } = {
  events: 'Welcome to the Events page! Here you can find upcoming temple events and ceremonies.',
  sevas: 'This is the Sevas page. Discover different types of Sevas available at Shri Rama Temple.',
  gallery: 'Browse the Gallery of Shri Rama Temple to view its beauty and heritage.',
};

export default function DynamicPage() {
  const router = useRouter();
  const page = router.query.page as string;

  const content = pageContent[page] || 'Welcome to Shri Rama Temple.';

  return (
    <main>
      <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
      <p>{content}</p>
    </main>
  );
}
