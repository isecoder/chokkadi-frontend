"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Calendar from "../../components/Calendar";

interface AddManualFormProps {
  onAddSuccess: () => void;
}

export default function AddManualForm({ onAddSuccess }: AddManualFormProps) {
  // We'll use this key to force re-render the Calendar
  const [calendarKey, setCalendarKey] = useState(0);

  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keep form fields separate; date is handled in `selectedDate`
  const [formData, setFormData] = useState({
    name: "",
    reason: "",
    mobileNumber: "",
    mobileNumberConfirmation: "",
  });

  // Triggered by the Calendar when a user selects a date
  const handleDateSelect = (_hallId: number, date: string) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  // Generic handler for text inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Final form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the payload
      const payload = {
        mobileNumber: `+91${formData.mobileNumber}`,
        formDetails: {
          ...formData,
          mobileNumber: `+91${formData.mobileNumber}`,
          mobileNumberConfirmation: `+91${formData.mobileNumberConfirmation}`,
          hallId: 3, // Assuming hallId is always 1 in this example
          date: selectedDate,
        },
      };

      // Send POST request
      const response = await fetch("/api/hallforms/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add hall form");
      }

      Swal.fire("Success!", "Hall form has been added.", "success");

      // Reset form fields
      setFormData({
        name: "",
        reason: "",
        mobileNumber: "",
        mobileNumberConfirmation: "",
      });
      setSelectedDate("");
      setShowForm(false);

      // Refresh the calendar by changing its key
      setCalendarKey((prevKey) => prevKey + 1);

      // Call parent callback to handle any other actions
      onAddSuccess();
    } catch (error) {
      Swal.fire(
        "Error!",
        error instanceof Error ? error.message : "Failed to add hall form",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 1. Display the Calendar first, using 'calendarKey' for forced re-render */}
      <Calendar key={calendarKey} hallId={3} onDateSelect={handleDateSelect} />

      {/* 2. Show the form only if a date is selected */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-md shadow-md mt-4"
        >
          <h2 className="text-xl font-bold mb-4">Add New Hall Form</h2>

          <div className="mb-4">
            <label className="block font-medium mb-2">Selected Date</label>
            <div className="border border-gray-300 rounded-md p-2">
              {new Date(selectedDate).toLocaleDateString("en-GB")}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Mobile Number</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="px-2">🇮🇳 +91</span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData((prev) => ({
                    ...prev,
                    mobileNumber: value,
                    mobileNumberConfirmation: value,
                  }));
                }}
                required
                className="flex-1 p-2 border-none"
                placeholder="Enter 10-digit number"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {loading ? "Adding..." : "Add Hall Form"}
          </button>
        </form>
      )}
    </div>
  );
}
