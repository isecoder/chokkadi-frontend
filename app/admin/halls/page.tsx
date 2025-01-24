"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../components/LoadingSpinner";
import AddHall from "../components/AddHallForm";
import Swal from "sweetalert2";
import UpdateHallForm from "../components/UpdateHallForm";
import Image from "next/image";

interface Hall {
  id: number;
  name: string;
  description: string;
  name_kannada?: string;
  description_kannada?: string;
  images: string[]; // Array of public image URLs
}

const HallsList = (): JSX.Element => {
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );

  const [halls, setHalls] = useState<Hall[]>([]);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch halls from API
  const fetchHalls = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/halls");
      if (!res.ok) throw new Error("Failed to load halls");
      const { data } = await res.json();

      const formattedData = data.map(
        (hall: {
          hall_id: number;
          name: string;
          description: string;
          name_kannada?: string;
          description_kannada?: string;
          HallImages: { Images: { public_url: string } }[];
        }) => ({
          id: hall.hall_id,
          name: hall.name,
          description: hall.description,
          name_kannada: hall.name_kannada,
          description_kannada: hall.description_kannada,
          images: hall.HallImages.map((image) => image.Images.public_url),
        })
      );

      setHalls(formattedData);
    } catch (err) {
      console.error(err);
      setError("Failed to load halls. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Delete hall
  const deleteHall = async (id: number) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`/api/halls/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete hall");
        }

        setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== id));
        Swal.fire("Deleted!", "Your hall has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error instanceof Error ? error.message : "Failed to delete hall",
          "error"
        );
      }
    }
  };

  // Update hall callback
  const handleUpdateHall = () => {
    Swal.fire({
      title: "Update Successful!",
      text: "The hall has been updated successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      fetchHalls(); // Reload halls after updating
    });
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <AddHall onAdd={fetchHalls} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}
      {!loading && halls.length === 0 && !error && (
        <p className="text-center">No halls available.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {halls.map((hall) => (
          <div
            key={hall.id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 cursor-pointer relative flex flex-col justify-between"
            style={{ minHeight: "320px" }}
          >
            <h2 className="text-xl font-semibold text-gray-800 break-words">
              {showKannada ? hall.name_kannada : hall.name}
            </h2>
            <p className="text-gray-600 mt-2 break-words">
              {showKannada ? hall.description_kannada : hall.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {hall.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Hall image ${index + 1}`}
                  width={500}
                  height={300}
                  className="rounded"
                />
              ))}
            </div>
            <div className="mt-auto flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHall(hall);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHall(hall.id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedHall && (
        <UpdateHallForm
          hall={selectedHall}
          onUpdate={handleUpdateHall}
          onClose={() => setSelectedHall(null)}
        />
      )}
    </div>
  );
};

export default HallsList;
