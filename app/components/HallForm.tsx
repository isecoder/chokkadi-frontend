import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type LocaleType = "en" | "kn"; // Define the language type

const hallFormText: Record<
  LocaleType,
  {
    fullName: string;
    reasonForBooking: string;
    selectReason: string;
    wedding: string;
    upanayana: string;
    reception: string;
    others: string;
    customReason: string;
    mobileNumber: string;
    enterMobile: string;
    sendOtp: string;
    enterOtp: string;
    verifyOtp: string;
    reserveNow: string;
    submitting: string;
    otpSent: string;
    otpVerified: string;
    verifyBeforeSubmit: string;
    selectDate: string;
    bookingSuccess: string;
  }
> = {
  en: {
    fullName: "Full Name",
    reasonForBooking: "Reason for Booking",
    selectReason: "Select a reason",
    wedding: "Wedding",
    upanayana: "Upanayana",
    reception: "Reception",
    others: "Others",
    customReason: "Custom Reason",
    mobileNumber: "Mobile Number",
    enterMobile: "Enter your mobile number",
    sendOtp: "Send OTP",
    enterOtp: "Enter OTP",
    verifyOtp: "Verify OTP",
    reserveNow: "Reserve Now",
    submitting: "Submitting...",
    otpSent: "OTP sent successfully!",
    otpVerified: "OTP verified successfully!",
    verifyBeforeSubmit: "Please verify your OTP before submitting.",
    selectDate: "Selected Date",
    bookingSuccess: "Reservation successful!",
  },
  kn: {
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    reasonForBooking: "ಬುಕಿಂಗ್ ಮಾಡುವ ಕಾರಣ",
    selectReason: "ಒಂದು ಕಾರಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    wedding: "ಮದುವೆ",
    upanayana: "ಉಪನಯನ",
    reception: "ರಿಸೆಪ್ಷನ್",
    others: "ಇತರ",
    customReason: "ಇತರ ಕಾರಣ",
    mobileNumber: "ಮೊಬೈಲ್ ನಂಬರ್",
    enterMobile: "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    sendOtp: "OTP ಕಳುಹಿಸಿ",
    enterOtp: "OTP ನಮೂದಿಸಿ",
    verifyOtp: "OTP ಪರಿಶೀಲಿಸಿ",
    reserveNow: "ಇಲ್ಲಿ ಬುಕ್ ಮಾಡಿ",
    submitting: "ಸಲ್ಲಿಸುತ್ತಿದೆ...",
    otpSent: "OTP ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!",
    otpVerified: "OTP ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ!",
    verifyBeforeSubmit: "ದಯವಿಟ್ಟು OTP ಪರಿಶೀಲಿಸಿ, ನಂತರ ಸಲ್ಲಿಸಿ.",
    selectDate: "ಆಯ್ಕೆ ಮಾಡಿದ ದಿನಾಂಕ",
    bookingSuccess: "ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ!",
  },
};

interface HallFormProps {
  selectedHallId: number;
  selectedDate: string;
  setMessage: (message: string) => void;
}

const HallForm: React.FC<HallFormProps> = ({
  selectedHallId,
  selectedDate,
  setMessage,
}) => {
  const [name, setName] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;
  const text = hallFormText[currentLocale]; // This ensures `text` is always defined

  const reasonColors: Record<string, string> = {
    Wedding: "bg-blue-200 text-blue-700",
    Upanayana: "bg-yellow-200 text-yellow-700",
    Reception: "bg-red-200 text-red-700",
    Others: "bg-purple-200 text-purple-700",
  };

  const sendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: "+91" + mobileNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP sent successfully!");
        setIsOtpSent(true);
      } else {
        setMessage(`Error: ${data.message || "Failed to send OTP."}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error: Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: "+91" + mobileNumber, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP verified successfully!");
        setIsOtpVerified(true);
      } else {
        setMessage(`Error: ${data.message || "Failed to verify OTP."}`);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Error: Failed to verify OTP.");
    }
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpVerified) {
      setMessage("Please verify your OTP before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hallforms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: "+91" + mobileNumber,
          formDetails: {
            name,
            reason: reason === "Others" ? customReason : reason,
            mobileNumber: "+91" + mobileNumber,
            mobileNumberConfirmation: "+91" + mobileNumber,
            date: selectedDate,
            hallId: selectedHallId,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const { bookingId, formDetails } = data.data;
        const formattedDate = new Date(formDetails.date).toLocaleDateString(
          "en-GB"
        );
        alert(
          `Hare Raama!\n\nThank you for reserving the hall at Shrirama Temple Chokkadi.\n\nYour request is under review. Please contact the temple authority at one of the following numbers: +91 94486 25254, +91 70196 16082, 08257 200585, or +91 97412 51613 for confirmation within 26 hours to finalize your booking.\n\nBooking Id: ${bookingId}\n\nDetails provided by you:\n- Name: ${formDetails.name}\n- Purpose: ${formDetails.reason}\n- Mobile: ${formDetails.mobileNumber}\n- Booking Date: ${formattedDate}\n\nTo confirm the booking, please make the necessary payment and contact the temple authority. Failure to confirm within the given time may result in cancellation of the reservation.\n\nThank you,\nShrirama Temple Chokkadi`
        );
        setName("");
        setReason("");
        setCustomReason("");
        setMobileNumber("");
        setOtp("");
        setIsOtpSent(false);
        setIsOtpVerified(false);
      } else {
        setMessage(`Error: ${data.message || "Failed to reserve hall."}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error: Failed to submit form.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      {/* Selected Date */}
      <div>
        <label className="block text-sm font-medium">{text.selectDate}</label>
        <input
          type="text"
          value={new Date(selectedDate).toLocaleDateString("en-GB")}
          disabled
          className="mt-1 p-2 border rounded w-full bg-gray-100 text-gray-700"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium">{text.fullName}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>

      {/* Reason for Booking */}
      <div>
        <label className="block text-sm font-medium">
          {text.reasonForBooking}
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={`mt-1 p-2 border rounded w-full ${
            reasonColors[reason] || ""
          }`}
          required
        >
          <option value="">{text.selectReason}</option>
          <option value="Wedding">{text.wedding}</option>
          <option value="Upanayana">{text.upanayana}</option>
          <option value="Reception">{text.reception}</option>
          <option value="Others">{text.others}</option>
        </select>
      </div>

      {/* Custom Reason (Only if "Others" is Selected) */}
      {reason === "Others" && (
        <div>
          <label className="block text-sm font-medium">
            {text.customReason}
          </label>
          <input
            type="text"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
      )}

      {/* Mobile Number */}
      <div>
        <label className="block text-sm font-medium">{text.mobileNumber}</label>
        <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded px-3 py-2">
            <span role="img" aria-label="India flag">
              🇮🇳
            </span>
            <span className="ml-2 text-gray-700 font-medium">+91</span>
          </div>
          <input
            type="text"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            className="flex-1 p-2 border border-gray-300 rounded w-full"
            placeholder={text.enterMobile}
            maxLength={10}
            required
          />
        </div>

        {/* Send OTP Button */}
        {!isOtpSent && (
          <button
            type="button"
            onClick={sendOtp}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {text.sendOtp}
          </button>
        )}
      </div>

      {/* OTP Input & Verification */}
      {isOtpSent && (
        <div>
          <label className="block text-sm font-medium">{text.enterOtp}</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
          {!isOtpVerified && (
            <button
              type="button"
              onClick={verifyOtp}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {text.verifyOtp}
            </button>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isSubmitting ? text.submitting : text.reserveNow}
      </button>
    </form>
  );
};

export default HallForm;
