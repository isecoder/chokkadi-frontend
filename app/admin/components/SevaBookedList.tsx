"use client";
import { useEffect, useState } from "react";

interface Seva {
  id: number;
  name: string;
  user: string;
  date: string;
}

export default function SevaBookedList() {
  const [sevas, setSevas] = useState<Seva[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch booked Sevas from API
    const fetchSevas = async () => {
      try {
        const response = await fetch("/api/booked-sevas"); 
        if (!response.ok) {
          throw new Error("Failed to fetch booked Sevas");
        }
        const data = await response.json();
        setSevas(data);
      } catch (error: unknown) {
        // Type check for error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSevas();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded p-4 mb-8">
      <h2 className="text-xl font-medium mb-4">Seva Booked List</h2>
      {sevas.length > 0 ? (
        <ul>
          {sevas.map((seva) => (
            <li key={seva.id} className="border-b py-2">
              <p className="font-semibold">{seva.name}</p>
              <p>User: {seva.user}</p>
              <p>Date: {new Date(seva.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No booked Sevas found.</p>
      )}
    </div>
  );
}
