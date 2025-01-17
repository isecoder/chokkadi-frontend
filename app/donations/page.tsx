"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Define types for locales
type LocaleType = "en" | "kn";

// Define text content for each language
const donationText: Record<LocaleType, { title: string; generalDonation: string; annadanaDonation: string; bank: string; accountNumber: string; ifscCode: string; generalAccount: string; annadanaAccount: string; ifsc: string }> = {
  en: {
    title: "Account Details",
    generalDonation: "General Donation",
    annadanaDonation: "Donation for Annadana",
    bank: "Bank of Baroda",
    accountNumber: "Account Number",
    ifscCode: "IFSC Code",
    generalAccount: "70640100001978",
    annadanaAccount: "70640100000059",
    ifsc: "BARB0VJKOMO"
  },
  kn: {
    title: "ಖಾತೆ ವಿವರಗಳು",
    generalDonation: "ಸಾಮಾನ್ಯ ದೇಣಿಗೆ",
    annadanaDonation: "ಅನ್ನದಾನಕ್ಕಾಗಿ ದೇಣಿಗೆ",
    bank: "ಬ್ಯಾಂಕ್ ಆಫ್ ಬರೋಡಾ",
    accountNumber: "ಖಾತೆ ಸಂಖ್ಯೆ",
    ifscCode: "IFSC ಕೋಡ್",
    generalAccount: "70640100001978",
    annadanaAccount: "70640100000059",
    ifsc: "BARB0VJKOMO"
  }
};

const DonationsPage: React.FC = () => {
  const currentLocale: LocaleType = useSelector((state: RootState) => state.locale.locale) as LocaleType;

  const text = donationText[currentLocale];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-white to-orange-100">
      <h1 className="mb-8 text-3xl font-bold text-orange-600">{text.title}</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl w-full">
        {/* Box 1: General Donation */}
        <div className="p-6 bg-gradient-to-b from-white to-orange-100 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-orange-600 mb-2">{text.generalDonation}</h2>
          <p className="text-lg font-semibold text-gray-800">{text.bank}</p>
          <p className="text-lg text-gray-800">
            {text.accountNumber}: <span className="font-normal">{text.generalAccount}</span>
          </p>
          <p className="text-lg text-gray-800">
            {text.ifscCode}: <span className="font-normal">{text.ifsc}</span>
          </p>
        </div>

        {/* Box 2: Donation for Annadana */}
        <div className="p-6 bg-gradient-to-b from-white to-orange-100 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-orange-600 mb-2">{text.annadanaDonation}</h2>
          <p className="text-lg font-semibold text-gray-800">{text.bank}</p>
          <p className="text-lg text-gray-800">
            {text.accountNumber}: <span className="font-normal">{text.annadanaAccount}</span>
          </p>
          <p className="text-lg text-gray-800">
            {text.ifscCode}: <span className="font-normal">{text.ifsc}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationsPage;
