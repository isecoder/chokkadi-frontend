"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import HallList from "../components/HallList";
import HallForm from "../components/HallForm";
import { Hall, HallsResponse } from "./types";

const BookingPage = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedHallId, setSelectedHallId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [mounted, setMounted] = useState(false); // Mount state

  // Get translated text from Redux
  const { reserveAHall } = useSelector(
    (state: RootState) => state.locale.messages
  );

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchHallsAndImages = async () => {
      try {
        const response = await fetch("/api/halls");
        const hallsData: HallsResponse = await response.json();
        if (hallsData.statusCode === 200 && Array.isArray(hallsData.data)) {
          const updatedHalls = hallsData.data.map((hall) => ({
            ...hall,
            images: hall.HallImages.map((img) => img.Images.public_url).filter(
              Boolean
            ),
          }));
          setHalls(updatedHalls);
        } else {
          setMessage("Error: Invalid halls data format.");
        }
      } catch (error) {
        console.error("Failed to fetch halls", error);
        setMessage("Error: Could not fetch halls.");
      }
    };

    fetchHallsAndImages();
  }, []);

  const handleDateSelect = (hallId: number, date: string) => {
    window.scrollTo({ top: 30, behavior: "smooth" });
    setSelectedHallId(hallId);
    setSelectedDate(date);
  };

  const goBack = () => {
    setSelectedHallId(null);
    setSelectedDate(null);
    setMessage("");
  };

  if (!mounted) {
    // Prevent rendering until component has mounted
    return null;
  }

  return (
    // <main className="min-h-screen p-6  bg-[var(--background)] ">
    <main className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
    <div className="bg-[var(--background)] container max-w-prose mx-auto p-4 mb-80">
      <h1 className="text-2xl font-bold mb-6 mt-10 text-center">
        {reserveAHall}
      </h1>
      {!selectedHallId || !selectedDate ? (
        <HallList halls={halls} onDateSelect={handleDateSelect} />
      ) : (
        <div>
          <HallForm
            selectedHallId={selectedHallId as number}
            selectedDate={selectedDate as string}
            setMessage={setMessage}
          />
          <button
            onClick={goBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back
          </button>
        </div>
      )}
      {message && <div className="text-center text-red-500">{message}</div>}
    </div>
    </main>
  );
};

export default BookingPage;
