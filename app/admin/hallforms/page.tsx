"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the LoadingSpinner component
import Swal from "sweetalert2";

// Interface for each HallForm entry
interface HallForm {
  id: number;
  name: string;
  reason: string;
  gotra?: string; // Optional
  mobileNumber: string;
  date: string; // DD/MM/YYYY format date string
  hallId: number;
  hallName: string;
}

// Interface for API response that includes the nested hall object
interface ApiHallForm extends HallForm {
  hall: { name: string };
}

export default function HallForms(): JSX.Element {
  const [hallForms, setHallForms] = useState<HallForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for filter inputs
  const [filters, setFilters] = useState({
    name: "",
    mobileNumber: "",
    date: "",
    id: "",
  });

  // State for filtered results
  const [filteredHallForms, setFilteredHallForms] = useState<HallForm[]>([]);

  // Fetch Hall Forms with Hall name included
  const fetchHallForms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hallforms`);
      if (!res.ok) throw new Error("Failed to load hall forms");

      const { data }: { data: ApiHallForm[] } = await res.json(); // Type response data
      const formattedData = data.map((form) => ({
        ...form,
        hallName: form.hall.name || "N/A", // Access hall name safely
        bookingId: `${form.id}`, // Format id as bookingId
        date: new Date(form.date).toLocaleDateString("en-GB"), // Format date as DD/MM/YYYY
      }));

      setHallForms(formattedData);
      setFilteredHallForms(formattedData); // Initialize filtered results
    } catch (err) {
      console.error(err);
      setError("Failed to load hall forms. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHallForm = async (id: number) => {
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
        const response = await fetch(`/api/hallforms/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete hall form");
        }

        // Update the local state to remove the deleted hall form
        setFilteredHallForms((prevForms) =>
          prevForms.filter((form) => form.id !== id)
        );

        Swal.fire("Deleted!", "Your hall form has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error instanceof Error ? error.message : "Failed to delete hall",
          "error"
        );
      }
    }
  };

  // Function to handle filter input changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    fetchHallForms();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const { name, mobileNumber, date, id } = filters;

      const filteredForms = hallForms.filter((form) => {
        const matchesName = form.name
          .toLowerCase()
          .includes(name.toLowerCase());
        const matchesMobile = form.mobileNumber.includes(mobileNumber);
        const matchesDate = form.date.includes(date);
        const matchesId = form.id.toString().includes(id);

        return matchesName && matchesMobile && matchesDate && matchesId;
      });

      setFilteredHallForms(filteredForms);
    };

    applyFilters(); // Apply filters whenever the filters change
  }, [filters, hallForms]); // Depend on both filters and original hallForms

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}
      {!loading && filteredHallForms.length === 0 && !error && (
        <p className="text-center text-orange-500 font-medium">
          No hall forms available.
        </p>
      )}

      {/* Filter Inputs */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Search by Mobile Number"
          value={filters.mobileNumber}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <input
          type="text"
          name="date"
          placeholder="Search by Date (DD/MM/YYYY)"
          value={filters.date}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <input
          type="text"
          name="id"
          placeholder="Search by ID"
          value={filters.id}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredHallForms.map((form) => (
          <div
            key={form.id}
            className="bg-white border-l-4 border-orange-500 shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105 flex flex-col justify-between max-w-xs mx-auto"
          >
            <h2 className="text-xl font-semibold text-orange-600 mb-2">
              {form.name}
            </h2>
            <p className="text-gray-700 mb-2">Booking ID: {form.id}</p>
            <p className="text-gray-700 mb-2">Hall Name: {form.hallName}</p>
            <p className="text-gray-700 mb-2">Reason: {form.reason}</p>
            {form.gotra && (
              <p className="text-gray-700 mb-2">Gotra: {form.gotra}</p>
            )}
            <p className="text-gray-700 mb-2">Mobile: {form.mobileNumber}</p>
            <p className="text-sm text-gray-500 font-medium">
              Date: {form.date}
            </p>
            <button
              onClick={() => deleteHallForm(form.id)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded block" // Visible on all devices
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
