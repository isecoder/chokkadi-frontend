"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define a type for the locales
type LocaleType = "en" | "kn";

// Define content for transport and pooja timings in both English and Kannada
const content: Record<LocaleType, { title: string; details: { title: string; description: string }[] }> = {
  en: {
    title: "About Temple",
    details: [
      { title: "Pooja Timings of Shri Rama Temple:", description: "7 am to 1 pm | 5 pm to 8 pm" },
      { title: "Morning Puja", description: "8:00 AM - 8:15 AM" },
      { title: "Maha Puja", description: "12:00 PM - 12:15 PM" },
      { title: "Night Puja", description: "8 PM" },
      { title: "Nearest Bus Stand", description: "Chokkadi" },
      { title: "Nearest Major Bus Stand", description: "Bellare (9.3 km)" },
      { title: "Nearest Railway Station", description: "Yedamangala (16.5 km)" },
      { title: "Nearest Major Railway Station", description: "Subrahmanya Road (33.4 km)" },
      { title: "Nearest Airport", description: "Mangalore International Airport (92.7 km)" },
    ],
  },
  kn: {
    title: "ದೇವಸ್ಥಾನದ ಮಾಹಿತಿ",
    details: [
      { title: "ಶ್ರೀ ದೇವಸ್ಥಾನದ ಪೂಜಾ ಸಮಯ:", description: "ದರ್ಶನ ಸಮಯ:\nಬೆಳಗ್ಗೆ 7 ಗಂಟೆಯಿಂದ ಮಧ್ಯಾಹ್ನ 1 ಗಂಟೆಯ ತನಕ | ಸಂಜೆ 5 ಗಂಟೆಯಿಂದ ರಾತ್ರಿ 8 ಗಂಟೆಯ ತನಕ" },
      { title: "ಬೆಳಗ್ಗೆಯ ಪೂಜೆ", description: "8:00 - 8:15 ತನಕ" },
      { title: "ಮಹಾಪೂಜೆ", description: "ಮಧ್ಯಾಹ್ನ 12:00 - 12:15 ತನಕ" },
      { title: "ರಾತ್ರಿಯ ಪೂಜೆ", description: "ರಾತ್ರಿ 8 ಗಂಟೆ" },
      { title: "ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನಕ್ಕೆ ಹತ್ತಿರದಲ್ಲಿರುವ ಬಸ್ಸು ನಿಲ್ದಾಣ", description: "ಹರಿಹರಪಲ್ಲತ್ತಡ್ಕ" },
      { title: "ಹತ್ತಿರದ ಪ್ರಮುಖ ಬಸ್ಸು ನಿಲ್ದಾಣ", description: "ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ (8 ಕಿ.ಮಿ)" },
      { title: "ಹತ್ತಿರದಲ್ಲಿರುವ ರೈಲು ನಿಲ್ದಾಣ", description: "ಸುಬ್ರಹ್ಮಣ್ಯ ರೋಡ್ (21 ಕಿ.ಮಿ)" },
      { title: "ಹತ್ತಿರದಲ್ಲಿರುವ ವಿಮಾನ ನಿಲ್ದಾಣ", description: "ಮಂಗಳೂರು ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ (117 ಕಿ.ಮಿ)" },
    ],
  },
};

export default function About() {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;

  const { title, details } = content[currentLocale];
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-white to-[#fbc687] font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">{title}</h1>
      <div className="max-w-2xl mx-auto bg-opacity-90 p-8 rounded-lg shadow-lg">
        {details.map(({ title, description }, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-orange-600 font-semibold text-lg">{title}</h2>
            <p className="text-[#4a4a4a] leading-relaxed text-base mt-2 whitespace-pre-line">{description}</p>
            {index < details.length - 1 && (
              <hr className="border-t border-gray-300 my-4" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
