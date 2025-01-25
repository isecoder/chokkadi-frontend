"use client";

import React from "react";

// Interface for HallForm
interface HallForm {
  id: number;
  name: string;
  reason: string;
  gotra?: string;
  mobileNumber: string;
  date: Date; // Updated to use Date type
  hallId: number;
  hallName: string;
  isBooked: boolean;
}

interface HallFormsListProps {
  hallForms: HallForm[];
  onConfirm: (id: number, date: Date) => void; // Updated to pass Date type
  onDelete: (id: number) => void;
}

export default function HallFormsList({
  hallForms,
  onConfirm,
  onDelete,
}: HallFormsListProps): JSX.Element {
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
          {/* Add the DES prefix for display */}
          <p className="text-gray-700 mb-2">Booking ID: DES{form.id}</p>
          <p className="text-gray-700 mb-2">Hall Name: {form.hallName}</p>
          <p className="text-gray-700 mb-2">Reason: {form.reason}</p>
          {form.gotra && (
            <p className="text-gray-700 mb-2">Gotra: {form.gotra}</p>
          )}
          <p className="text-gray-700 mb-2">Mobile: {form.mobileNumber}</p>
          <p className="text-sm text-gray-500 font-medium">
            Date: {form.date.toLocaleDateString("en-GB")} {/* Format Date */}
          </p>
          <p
            className={`text-sm font-medium ${
              form.isBooked ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {form.isBooked ? "Confirmed" : "Pending"}
          </p>
          {!form.isBooked && (
            <button
              onClick={() => onConfirm(form.id, form.date)} // Pass numeric ID and Date object
              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded block"
            >
              Confirm
            </button>
          )}
          <button
            onClick={() => onDelete(form.id)} // Pass numeric ID
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded block"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
