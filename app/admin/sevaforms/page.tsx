"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the LoadingSpinner component
import Swal from "sweetalert2";

// Interface for each SevaForm entry
interface SevaForm {
  id: number;
  name: string;
  nakshathra: string;
  rashi: string;
  gotra?: string; // Optional
  mobileNumber: string;
  date: string; // DD/MM/YYYY format date string
  sevaId: number;
  sevaName: string;
}

// Interface for API response that includes the nested seva object
interface ApiSevaForm extends SevaForm {
  seva: { name: string };
}

export default function SevaForms(): JSX.Element {
  const [sevaForms, setSevaForms] = useState<SevaForm[]>([]);
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
  const [filteredSevaForms, setFilteredSevaForms] = useState<SevaForm[]>([]);

  // Fetch Seva Forms with Seva name included
  const fetchSevaForms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sevaforms`);
      if (!res.ok) throw new Error("Failed to load seva forms");

      const { data }: { data: ApiSevaForm[] } = await res.json(); // Type response data
      const formattedData = data.map((form) => ({
        ...form,
        sevaName: form.seva.name || "N/A", // Access seva name safely
        bookingId: `BM${form.id}`, // Format id as bookingId
        date: new Date(form.date).toLocaleDateString("en-GB"), // Format date as DD/MM/YYYY
      }));

      setSevaForms(formattedData);
      setFilteredSevaForms(formattedData); // Initialize filtered results
    } catch (err) {
      console.error(err);
      setError("Failed to load seva forms. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSevaForm = async (id: number) => {
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
        const response = await fetch(`/api/sevaforms/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete seva form");
        }

        // Update the local state to remove the deleted seva form
        setFilteredSevaForms((prevForms) =>
          prevForms.filter((form) => form.id !== id)
        );

        Swal.fire("Deleted!", "Your seva form has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          error instanceof Error ? error.message : "Failed to delete seva",
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
    fetchSevaForms();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const { name, mobileNumber, date, id } = filters;

      const filteredForms = sevaForms.filter((form) => {
        const matchesName = form.name
          .toLowerCase()
          .includes(name.toLowerCase());
        const matchesMobile = form.mobileNumber.includes(mobileNumber);
        const matchesDate = form.date.includes(date);
        const matchesId = form.id.toString().includes(id);

        return matchesName && matchesMobile && matchesDate && matchesId;
      });

      setFilteredSevaForms(filteredForms);
    };

    applyFilters(); // Apply filters whenever the filters change
  }, [filters, sevaForms]); // Depend on both filters and original sevaForms

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <LoadingSpinner />}
      {!loading && filteredSevaForms.length === 0 && !error && (
        <p className="text-center text-orange-500 font-medium">
          No seva forms available.
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
        {filteredSevaForms.map((form) => (
          <div
            key={form.id}
            className="bg-white border-l-4 border-orange-500 shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105 flex flex-col justify-between max-w-xs mx-auto"
          >
            <h2 className="text-xl font-semibold text-orange-600 mb-2">
              {form.name}
            </h2>
            <p className="text-gray-700 mb-2">Booking ID: BM{form.id}</p>
            <p className="text-gray-700 mb-2">Seva Name: {form.sevaName}</p>
            <p className="text-gray-700 mb-2">Nakshathra: {form.nakshathra}</p>
            <p className="text-gray-700 mb-2">Rashi: {form.rashi}</p>
            {form.gotra && (
              <p className="text-gray-700 mb-2">Gotra: {form.gotra}</p>
            )}
            <p className="text-gray-700 mb-2">Mobile: {form.mobileNumber}</p>
            <p className="text-sm text-gray-500 font-medium">
              Date: {form.date}
            </p>
            <button
              onClick={() => deleteSevaForm(form.id)}
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
