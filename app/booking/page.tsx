"use client";
import React, { useState, useEffect } from "react";

// Define the type for the hall object
interface Hall {
  hall_id: string;
  name: string;
  description: string;
}

const BookingPage = () => {
  const [halls, setHalls] = useState<Hall[]>([]); // Specify the type as Hall[]
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false); // Flag for OTP verification status
  const [date, setDate] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false); // Track OTP sent status
  const [otpTimeout, setOtpTimeout] = useState<number>(60); // Timeout for OTP in seconds

  // Fetch halls on component mount
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch("/api/halls");
        const responseData = await response.json(); // Get the response
        if (
          responseData.statusCode === 200 &&
          Array.isArray(responseData.data)
        ) {
          setHalls(responseData.data); // Set the halls data
        } else {
          setMessage("Error: Invalid data format.");
        }
      } catch (error) {
        console.error("Failed to fetch halls", error);
        setMessage("Error: Could not fetch hall data.");
      }
    };

    fetchHalls();
  }, []);

  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    const fullMobileNumber = "+91" + mobileNumber;
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber: fullMobileNumber }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("OTP sent successfully. Please check your phone.");
        setIsOtpSent(true); // Mark OTP as sent
        setOtpTimeout(60); // Reset OTP timeout to 60 seconds

        // Disable the OTP button for 60 seconds
        const interval = setInterval(() => {
          setOtpTimeout((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsOtpSent(false); // Re-enable button after timeout
              return 60;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage(`Error: ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage("Error: Failed to send OTP");
      console.error("Error sending OTP", error);
    }
  };

  const handleVerifyOtp = async () => {
    const fullMobileNumber = "+91" + mobileNumber;
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber: fullMobileNumber, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Phone number verified ");
        alert("Phone number verified successfully!");
        setIsVerified(true); // Mark as verified
      } else {
        setMessage(`Error: ${data.message || "Invalid OTP"}`);
      }
    } catch (error) {
      setMessage("Error: Failed to verify OTP");
      console.error("Error verifying OTP", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      setMessage("Please verify your phone number before submitting.");
      return;
    }

    setIsSubmitting(true);
    if (!selectedHallId) {
      setMessage("Please select a hall.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/hallforms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: "+91" + mobileNumber,
          formDetails: {
            name,
            reason,
            mobileNumber: "+91" + mobileNumber,
            mobileNumberConfirmation: "+91" + mobileNumber,
            date, // Ensure date is used correctly
            hallId: selectedHallId,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Booking successful!");
        alert("Booking successful!");
        setName("");
        setReason("");
        setMobileNumber("");
        setOtp("");
        setDate(""); // Reset date
        setSelectedHallId(null);
      } else {
        setMessage(`Error: ${data.message || "Something went wrong"}`);
        alert(data.message || "Please try again later.");
      }
    } catch (error) {
      setMessage("Error: Failed to submit form");
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only alphabets
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only alphabets and spaces
    if (/^[A-Za-z\s]*$/.test(value)) {
      setReason(value);
    }
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^[0-9]*$/.test(value)) {
      setMobileNumber(value);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^[0-9]*$/.test(value)) {
      setOtp(value);
    }
  };

  return (
    <div className="container max-w-prose mx-auto  p-4 mb-80">
      <h1 className="text-2xl font-bold mb-6 mt-10 text-center">Book a Hall</h1>

      {!selectedHallId ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4  justify-center">
          {halls.map((hall) => (
            <div
              key={hall.hall_id}
              onClick={() => setSelectedHallId(hall.hall_id)}
              className="border p-4 rounded cursor-pointer   hover:bg-gray-100 text-center"
            >
              <h2 className="text-xl font-semibold">{hall.name}</h2>
              <p className="text-gray-600">{hall.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
          <div>
            <label className="block text-sm font-medium" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="reason">
              Reason for Booking
            </label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={handleReasonChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="mobileNumber">
              Mobile Number
            </label>
            <div className="flex items-center">
              <span className="text-gray-600">+91</span>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                className="mt-1 p-2 border rounded w-half"
                maxLength={10}
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isOtpSent}
                className="ml-2 p-2 bg-blue-500 text-white rounded w-1/4"
              >
                {isOtpSent ? `Wait ${otpTimeout}s` : "Send OTP"}
              </button>
            </div>
          </div>

          {/* Separate OTP div */}
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="otp">
              Enter OTP
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                className="mt-1 p-2 border rounded w-half"
                required
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="ml-2 p-2 bg-green-500 text-white rounded w-1/4"
              >
                Verify OTP
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="date">
              Booking Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      )}

      {message && (
        <div className="mt-4 text-center">
          <p className="text-xl">{message}</p>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
