"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust the import if needed
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the LoadingSpinner component
import AddSeva from "../components/AddSevaForm"; // Import the AddSeva component
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import UpdateSevaForm from "../components/UpdateSevaForm"; // Import UpdateSevaForm component

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
  const [selectedSeva, setSelectedSeva] = useState<Seva | null>(null); // Track selected seva for updating
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch sevas from API
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

  // Delete seva
  const deleteSeva = async (id: number) => {
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
        const response = await fetch(`/api/sevas/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete seva");
        }

        // Update the local state to remove the deleted seva
        setSevas((prevSevas) => prevSevas.filter((seva) => seva.id !== id));
        Swal.fire("Deleted!", "Your seva has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error instanceof Error ? error.message : "Failed to delete seva",
          "error"
        );
      }
    }
  };

  // Update seva callback
  const handleUpdateSeva = () => {
    Swal.fire({
      title: "Update Successful!",
      text: "The seva has been updated successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      // Reload the page after the user clicks "OK"
      window.location.reload();
    });
  };

  useEffect(() => {
    fetchSevas();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <AddSeva /> {/* Include the AddSeva component */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}{" "}
      {/* Show loading spinner while fetching */}
      {!loading && sevas.length === 0 && !error && (
        <p className="text-center">No sevas available.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {sevas.map((seva) => (
          <div
            key={seva.id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 cursor-pointer relative flex flex-col justify-between"
            style={{ minHeight: "320px" }} // Ensure consistent and compact height
          >
            <h2 className="text-xl font-semibold text-gray-800 break-words">
              {/* Allow title to wrap properly */}
              {showKannada ? seva.name_kannada : seva.name}
            </h2>
            <p className="text-gray-600 mt-2 break-words">
              {/* Allow description to wrap properly */}
              {showKannada ? seva.description_kannada : seva.description}
            </p>
            <p className="mt-4 font-bold text-lg">Price: ₹{seva.base_price}</p>
            <div className="mt-auto flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card from opening the modal
                  setSelectedSeva(seva); // Open update form
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card from opening the modal
                  deleteSeva(seva.id); // Call delete function
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedSeva && (
        <UpdateSevaForm
          seva={selectedSeva}
          onUpdate={handleUpdateSeva} // Trigger page reload after update
          onClose={() => setSelectedSeva(null)}
        />
      )}
    </div>
  );
};

export default SevasList;
