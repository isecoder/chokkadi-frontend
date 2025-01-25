"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner"; // Import the LoadingSpinner component
import HallFormsList from "../components/HallFormsList"; // Import the new HallFormsList component
import Swal from "sweetalert2";

// Interface for each HallForm entry
interface HallForm {
  id: number;
  name: string;
  reason: string;
  gotra?: string;
  mobileNumber: string;
  date: Date; // Date type instead of string
  hallId: number;
  hallName: string;
  isBooked: boolean;
}

// Interface for API response that includes the nested hall object
interface ApiHallForm {
  id: number;
  name: string;
  reason: string;
  mobileNumber: string;
  date: string; // Still string from the API
  hallId: number;
  hall: {
    name: string;
    hallAvailability: {
      date: string;
      is_booked: boolean;
    }[];
  };
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

  // Fetch Hall Forms with Hall name and isBooked status included
  const fetchHallForms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hallforms`);
      if (!res.ok) throw new Error("Failed to load hall forms");

      const { data }: { data: ApiHallForm[] } = await res.json(); // Type response data
      const formattedData = data.map((form) => {
        const availability = form.hall.hallAvailability.find(
          (avail) =>
            new Date(avail.date).toISOString() ===
            new Date(form.date).toISOString()
        );

        return {
          id: form.id,
          name: form.name,
          reason: form.reason,
          mobileNumber: form.mobileNumber,
          date: new Date(form.date), // Convert date string to Date object
          hallId: form.hallId,
          hallName: form.hall.name || "N/A", // Access hall name safely
          isBooked: availability?.is_booked || false, // Check if the hall is booked
        };
      });

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

  const confirmBooking = async (id: number, date: Date) => {
    try {
      const response = await fetch(`/api/hallforms/${id}/confirm-reserve`, {
        method: "PATCH", // Use PATCH instead of POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString() }), // Send the date in ISO format
      });

      if (!response.ok) {
        throw new Error("Failed to confirm reservation");
      }

      Swal.fire("Success!", "The reservation has been confirmed.", "success");

      // Refresh the hall forms list
      fetchHallForms();
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error
          ? error.message
          : "Failed to confirm reservation",
        "error"
      );
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
        const matchesDate = date
          ? form.date.toLocaleDateString("en-GB").includes(date)
          : true;
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

      {/* Render HallFormsList */}
      <HallFormsList
        hallForms={filteredHallForms}
        onConfirm={confirmBooking}
        onDelete={deleteHallForm}
      />
    </div>
  );
}
