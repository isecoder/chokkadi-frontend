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
    "Shrirama Temple in Chokkadi offers a hall suitable for various functions, including marriages, upanayanas, and other ceremonies. The hall can accommodate between 1000-1500 guests.",
    "The hall is spacious, with a comfortable environment for all your needs.",
    "Free WiFi facility is available with the hall.",
    "The hall is available at a very reasonable rent.",
  ],
  kn: [
    "ಚೊಕ್ಕಾಡಿಯ ಶ್ರೀ ರಾಮ ದೇವಸ್ಥಾನವು ಮದುವೆ, ಉಪನಯನ ಮತ್ತು ಇತರ ಸಮಾರಂಭಗಳಿಗೆ ಅನುಕೂಲಕರವಾದ ಸಭಾಂಗಣವನ್ನು ನೀಡುತ್ತದೆ. ಸಭಾಂಗಣವು 1000-1500 ಅತಿಥಿಗಳನ್ನು ಹೊಂದಲು ಅನುಕೂಲಕರವಾಗಿದೆ.",
    "ಸಭಾಂಗಣವು ವಿಶಾಲವಾಗಿದೆ ಮತ್ತು ಎಲ್ಲಾ ಅವಶ್ಯಕತೆಗಳಿಗೆ ಅನುಕೂಲಕರ ವಾತಾವರಣವನ್ನು ಹೊಂದಿದೆ.",
    "ಸಭಾಂಗಣದೊಂದಿಗೆ ಉಚಿತ ವೈಫೈ ಸೌಲಭ್ಯ ಲಭ್ಯವಿದೆ.",
    "ಸಭಾಂಗಣವು ಕೈಗೆಟಕುವ ಬಾಡಿಗೆಯಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
  ],
};

const titles: Record<LocaleType, string> = {
  en: "Desi Bhavana",
  kn: "ದೇಸೀ ಭವನ",
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
    <main className="min-h-screen flex flex-col items-center p-6 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-8">{titles[currentLocale]}</h1>
      <Image
        src="/hall.jpeg"
        width={600}
        height={400}
        alt="Community Hall"
        className="mb-8 rounded-lg shadow-lg"
      />
      <div className="max-w-2xl mx-auto text-justify text-lg">
        {hallInfo.map((line: string, index: number) => (
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </main>
  );
}
