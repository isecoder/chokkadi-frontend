"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the import if needed
import SevaForm from "./SevaForm"; // Ensure SevaForm is correctly imported
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component

interface Seva {
  id: number;
  name: string;
  description: string;
  base_price: number;
  name_kannada?: string; // Kannada name
  description_kannada?: string; // Kannada description
}

const SevasList = (): JSX.Element => {
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  ); // Track language from Redux state

  const [sevas, setSevas] = useState<Seva[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeva, setSelectedSeva] = useState<Seva | null>(null); // State to store selected seva
  const [loading, setLoading] = useState(false); // Loading state

  const fetchSevas = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(`/api/sevas`);
      if (!res.ok) throw new Error("Failed to load sevas");
      const { data } = await res.json();

      const formattedData = data.map(
        (seva: {
          seva_id: number;
          name: string;
          description: string;
          base_price: string;
          name_kannada?: string;
          description_kannada?: string;
        }) => ({
          id: seva.seva_id,
          name: seva.name,
          description: seva.description,
          base_price: parseFloat(seva.base_price), // Convert to number
          name_kannada: seva.name_kannada,
          description_kannada: seva.description_kannada,
        })
      );

      setSevas(formattedData);
    } catch (err) {
      console.error(err);
      setError("Failed to load sevas. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchSevas();
  }, []);

  const handleSevaClick = (seva: Seva) => {
    setSelectedSeva(seva); 
    window.scrollTo({top: 130,behavior:'smooth'});
  };

  if (selectedSeva) {
    return <SevaForm seva={selectedSeva} showKannada={showKannada} />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-white to-orange-100">
      <p className="text-center text-sm font-bold text-red-500 mb-4 animate-pulse shadow-lg">
        {showKannada
          ? "ದಯವಿಟ್ಟು ಸೇವೆಯನ್ನು ನಡೆಸುವ ದಿನಕ್ಕಿಂತ ಕನಿಷ್ಟ ಒಂದು ದಿನದ ಮುಂಚಿತವಾಗಿ ದೃಢೀಕರಣಕ್ಕಾಗಿ ದೇವಾಲಯದ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ."
          : "Please contact the temple office for confirmation regarding the seva at least one day prior to the day of worship."}
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />} 
      {!loading && sevas.length === 0 && !error && (
        <p className="text-center">No sevas available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-5xl w-full">
        {sevas.map((seva) => (
          <div
            key={seva.id}
            className="p-6 bg-gradient-to-b from-white to-orange-100 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer text-center"
            onClick={() => handleSevaClick(seva)}
          >
            <h2 className="text-xl font-bold text-orange-600 mb-2">
              {showKannada ? seva.name_kannada : seva.name}
            </h2>
            <p className="text-gray-700 mt-2">
              {showKannada ? seva.description_kannada : seva.description}
            </p>
            <p className="mt-4 font-semibold text-lg text-gray-800">
              Price: ₹{seva.base_price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevasList;
