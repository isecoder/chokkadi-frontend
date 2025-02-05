"use client";

import React, { useState } from "react";

interface HallForm {
  id: number;
  name: string;
  reason: string;
  gotra?: string;
  mobileNumber: string;
  date: Date;
  hallId: number;
  hallName: string;
  isBooked: boolean;
  paymentDetails?: string; // Added payment details field
}

interface HallFormsListProps {
  hallForms: HallForm[];
  onConfirm: (id: number, date: Date) => void;
  onDelete: (id: number) => void;
  fetchHallForms: () => void; // <-- Add this prop
}

export default function HallFormsList({
  hallForms,
  onConfirm,
  onDelete,
  fetchHallForms,
}: HallFormsListProps): JSX.Element {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [paymentInput, setPaymentInput] = useState<string>("");

  // Function to handle API call for updating payment details
  const updatePaymentDetails = async (id: number) => {
    if (!paymentInput.trim()) return;

    try {
      const response = await fetch(`/api/hallforms/${id}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentDetails: paymentInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment details");
      }

      alert("Payment details updated successfully!");
      setEditingId(null);
      fetchHallForms(); // <-- Re-fetch data to update UI
    } catch (error) {
      console.error("Error updating payment details:", error);
      alert("Error updating payment details. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {hallForms.map((form) => (
        <div
          key={form.id}
          className="bg-white border-l-4 border-orange-500 shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105 flex flex-col justify-between max-w-xs mx-auto"
        >
          <h2 className="text-xl font-semibold text-orange-600 mb-2">
            {form.name}
          </h2>
          <p className="text-gray-700 mb-2">Booking ID: DES{form.id}</p>
          <p className="text-gray-700 mb-2">Hall Name: {form.hallName}</p>
          <p className="text-gray-700 mb-2">Reason: {form.reason}</p>
          {form.gotra && (
            <p className="text-gray-700 mb-2">Gotra: {form.gotra}</p>
          )}
          <p className="text-gray-700 mb-2">Mobile: {form.mobileNumber}</p>
          <p className="text-sm text-gray-500 font-medium">
            Date: {form.date.toLocaleDateString("en-GB")}
          </p>
          <p
            className={`text-sm font-medium ${
              form.isBooked ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {form.isBooked ? "Confirmed" : "Pending"}
          </p>

          {/* Display Payment Details */}
          <p className="text-gray-700 font-medium mt-2">
            Payment Details:{" "}
            {form.paymentDetails ? form.paymentDetails : "Not provided"}
          </p>

          {/* Edit Payment Details Button */}
          {editingId === form.id ? (
            <div className="mt-2">
              <input
                type="text"
                value={paymentInput}
                onChange={(e) => setPaymentInput(e.target.value)}
                placeholder="Enter payment details"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={() => updatePaymentDetails(form.id)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded block"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="mt-2 bg-gray-500 text-white px-3 py-1 rounded block"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setEditingId(form.id);
                setPaymentInput(form.paymentDetails || "");
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded block"
            >
              Edit
            </button>
          )}

          {!form.isBooked && (
            <button
              onClick={() => onConfirm(form.id, form.date)}
              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded block"
            >
              Confirm
            </button>
          )}
          <button
            onClick={() => onDelete(form.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded block"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
