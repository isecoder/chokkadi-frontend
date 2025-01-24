"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Define types for locales
type LocaleType = "en" | "kn";

// Define text content for each language
const donationText: Record<
  LocaleType,
  {
    title: string;
    generalDonation: string;
    bank: string;
    branch: string;
    accountNumber: string;
    ifscCode: string;
  }
> = {
  en: {
    title: "Account Details",
    generalDonation: "General Donation",
    bank: "Bank of Baroda",
    branch: "Kukkujadka",
    accountNumber: "70690100003088",
    ifscCode: "BARBOVJKJDK",
  },
  kn: {
    title: "ಖಾತೆ ವಿವರಗಳು",
    generalDonation: "ಸಾಮಾನ್ಯ ದೇಣಿಗೆ",
    bank: "ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ",
    branch: "ಕುಕ್ಕುಜಡ್ಕ",
    accountNumber: "70690100003088",
    ifscCode: "BARBOVJKJDK",
  },
};

const DonationsPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLocale: LocaleType = useSelector((state: RootState) => state.locale.locale) as LocaleType;

  if (!mounted) {
    return null; // Avoid rendering until the component has mounted
  }

  const text = donationText[currentLocale];

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-yellow-200 font-serif">
      <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">{text.title}</h1>
      <div className="max-w-2xl w-full p-6 space-y-6">
        <div className="p-4 bg-yellow-300 rounded-lg shadow-md">
          <p className="text-green-700 text-base font-semibold">
            Bank (ಬ್ಯಾಂಕ್): <span className="font-bold">{text.bank}</span>
          </p>
        </div>
        <div className="p-4 bg-yellow-300 rounded-lg shadow-md">
          <p className="text-green-700 text-base font-semibold">
            Branch (ಶಾಖೆ): <span className="font-bold">{text.branch}</span>
          </p>
        </div>
        <div className="p-4 bg-yellow-300 rounded-lg shadow-md">
          <p className="text-green-700 text-base font-semibold">
            Account Number (ಖಾತೆ ಸಂಖ್ಯೆ): <span className="font-bold">{text.accountNumber}</span>
          </p>
        </div>
        <div className="p-4 bg-yellow-300 rounded-lg shadow-md">
          <p className="text-green-700 text-base font-semibold">
            IFSC Code (ಐಎಫ್ಎಸ್ಸಿ ಕೋಡ್): <span className="font-bold">{text.ifscCode}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default DonationsPage;
