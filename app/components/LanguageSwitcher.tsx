// app/components/LanguageSwitcher.tsx
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

export default function LanguageSwitcher() {
  const dispatch = useDispatch<AppDispatch>();
  const locale = useSelector((state: RootState) => state.locale.locale);

  const handleLocaleChange = () => {
    const newLocale = locale === "en" ? "kn" : "en"; // Toggle between languages
    dispatch(changeLocale(newLocale));
  };

  return (
    <button
      onClick={handleLocaleChange}
      className="py-2 px-4 rounded-md font-bold text-white transition duration-200 bg-orange-500 hover:bg-orange-600"
    >
      {locale === "en" ? "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ" : "Switch to English"}
    </button>
  );
}
