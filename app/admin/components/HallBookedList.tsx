"use client";
import { useEffect, useState } from "react";

interface Hall {
  id: number;
  name: string;
  user: string;
  date: string;
}

export default function HallBookedList() {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch booked Halls from API
    const fetchHalls = async () => {
      try {
        const response = await fetch("/api/booked-halls");
        if (!response.ok) {
          throw new Error("Failed to fetch booked Halls");
        }
        const data = await response.json();
        setHalls(data);
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

    fetchHalls();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white shadow-md rounded p-4 mb-8">
      <h2 className="text-xl font-medium mb-4">Hall Booked List</h2>
      {halls.length > 0 ? (
        <ul>
          {halls.map((hall) => (
            <li key={hall.id} className="border-b py-2">
              <p className="font-semibold">{hall.name}</p>
              <p>User: {hall.user}</p>
              <p>Date: {new Date(hall.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No booked Halls found.</p>
      )}
    </div>
  );
}
