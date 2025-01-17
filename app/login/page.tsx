// app/admin/login/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

// Define the expected structure of the error response
interface ApiError {
  message: string;
}

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter(); // Initialize useRouter for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Reset message when the user starts typing
    setMessage("");
    setIsError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json(); // Assert the response to ApiError
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setMessage(`Welcome back, ${data.name}`);
      setIsError(false); // Reset error state

      // Redirect to the admin dashboard after login
      router.push("/admin");
    } catch (error) {
      if (error instanceof Error) {
        // Check if error is an instance of Error
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsError(true); // Set error state
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fdfcf1] to-[#f2b890] rounded-lg p-8 max-w-md mx-auto shadow-md text-center">
      <h2 className="text-2xl mb-6 text-gray-800">Login</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="relative mb-6 w-full">
          <i className="fa fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border border-gray-300 rounded-md text-lg focus:outline-none"
            onChange={handleChange}
            required
          />
          <span className="text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2">
            *
          </span>
        </div>
        <div className="relative mb-6 w-full">
          <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 pl-10 border border-gray-300 rounded-md text-lg focus:outline-none"
            onChange={handleChange}
            required
          />
          <span className="text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2">
            *
          </span>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#ff5722] text-white py-2 px-4 rounded-md font-semibold"
          >
            LOGIN
          </button>
          <button
            type="reset"
            className="bg-[#ff5722] text-white py-2 px-4 rounded-md font-semibold"
          >
            RESET
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 ${isError ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminLogin;
