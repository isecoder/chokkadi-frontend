"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define a type for the locales
type LocaleType = "en" | "kn";

const messages: Record<LocaleType, string> = {
  en: "Content to be published soon.",
  kn: "ಇತಿಹಾಸವನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರಕಟಿಸಲಾಗುವುದು."
};

const titles: Record<LocaleType, string> = {
  en: "History",
  kn: "ಇತಿಹಾಸ",
};

export default function History() {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;

  const message = messages[currentLocale];
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <main className="min-h-screen flex flex-col items-center p-6 text-center" style={{ backgroundColor: "#f5f2a4" }}>
      <h1 className="text-3xl font-bold mb-6 text-green-700">{titles[currentLocale]}</h1>
      <p className="text-lg text-justify text-green-700">{message}</p>
    </main>
  );
}
