"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define a type for the locales
type LocaleType = "en" | "kn";

const hallDetails: Record<LocaleType, string[]> = {
  en: [
    "Shri Rama Temple in Hariharapallathadka offers a hall suitable for various functions, including marriages, upanayanas, and other ceremonies. The hall can accommodate between 600-800 guests.",
    "For more details or to make a booking, you can contact the temple administration at:",
    "Phone: 08257 283366, +91 9448116685, +91 8073030594",
    "Address: Shri Rama Temple, Hariharapallathadka Post and Village, Sullia Taluk, Dakshina Kannada, PIN - 574218",
  ],
  kn: [
    "ಹರಿಹರಪಲ್ಲತ್ತಡ್ಕದ ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನದಲ್ಲಿ ವಿವಿಧ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ, ವಿಶೇಷವಾಗಿ ಮದುವೆಗಳು, ಉಪನಯನ ಮತ್ತು ಇತರ ಸಮಾರಂಭಗಳಿಗೆ ಸುಸಜ್ಜಿತ ಸಭಾಂಗಣದ ವ್ಯವಸ್ಥೆಯಿದೆ.",
    "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಅಥವ ಸಭಾಂಗಣ ಕಾಯ್ದಿರಿಸಲು, ದೇವಸ್ಥಾನದ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು:",
    "ದೂರವಾಣಿ: 08257 283366,+91 8073030594",
    "ವಿಳಾಸ: ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನ, ಹರಿಹರಪಲ್ಲತ್ತಡ್ಕ, ಸುಳ್ಯ ತಾಲೂಕು, ದಕ್ಷಿಣ ಕನ್ನಡ, ಪಿನ್ - 574218",
  ],
};

const titles: Record<LocaleType, string> = {
  en: "Community Hall",
  kn: "ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ಕಲಾ ಮಂದಿರ",
};

export default function CommunityHall() {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;

  const hallInfo = hallDetails[currentLocale];
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <main className="min-h-screen flex flex-col items-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-8">{titles[currentLocale]}</h1>
      <Image src="/hariharatemplehall.jpg" width={600} height={400} alt="Community Hall" className="mb-8" />
      <div className="max-w-2xl mx-auto text-justify">
        {hallInfo.map((line: string, index: number) => (
          <p key={index} className="text-lg mb-4">
            {line}
          </p>
        ))}
      </div>
    </main>
  );
}
