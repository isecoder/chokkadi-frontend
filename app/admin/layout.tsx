"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string; // Add any other user properties you expect
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (!response.ok) {
        throw new Error("No active session");
      }

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const data = await response.json();
      setUser(null);
      setMessage(data.message);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Admin Panel</h1>
      {user ? (
        <>
          <p className="text-lg mb-4">
            Logged in as: <span className="font-bold">{user.name}</span>
          </p>
          <div className="flex justify-between mb-4">
            <button
              onClick={handleBack}
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 mr-2"
            >
              Back
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </>
      ) : (
        <p className="text-lg text-red-500">No active session</p>
      )}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AdminLayout;
