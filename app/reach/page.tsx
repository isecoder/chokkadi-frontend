"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define a type for the locales
type LocaleType = "en" | "kn";

// Define content in both English and Kannada
const howToReachMessages: Record<LocaleType, string[]> = {
  en: [
    "One can visit the Shrirama Temple, located 9.3 km from Bellare, which is a major town along SH 100 (Manjeshwara-Puttur-Subrahmanya State Highway). While traveling from Puttur to Subrahmanya, the temple can be reached by taking the Bellare-Pajapalla Road from Bellare, turning right at Ayyanakatte Cross, and continuing for 6.4 km.",
"Since there is no proper government bus service to Chokkadi, it is recommended to travel using your own vehicle. Alternatively, private vans operating between Bellare and Chokkadi can be used, or a vehicle can be arranged from Bellare. Sufficient KSRTC buses are available from Sulya (the taluk center), Puttur, and Subrahmanya to Bellare.",
"Although government bus services to Chokkadi are limited, there are four daily buses from Puttur to Chokkadi and four buses to Sulya, although these services may vary daily and are subject to cancellation.",
  ],
  kn: [
    "ಶ್ರೀರಾಮ ದೇವಾಲಯವು ರಾ.ಹೆ.ಸಂ. 100 (ಮಂಜೇಶ್ವರ-ಪುತ್ತೂರು-ಸುಬ್ರಹ್ಮಣ್ಯ ರಾಜ್ಯ ಹೆದ್ದಾರಿ)ಯಲ್ಲಿ ಬೆಳ್ಳಾರೆ ಎಂಬ ಪ್ರಮುಖ ಪಟ್ಟಣದಿಂದ 9.3 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ಚೊಕ್ಕಾಡಿ ಎಂಬ ಪುಟ್ಟ ಗ್ರಾಮದಲ್ಲಿದೆ. ಪುತ್ತೂರಿನಿಂದ ಸುಬ್ರಹ್ಮಣ್ಯಕ್ಕೆ ಪ್ರಯಾಣಿಸುವಾಗ, ಬೆಳ್ಳಾರೆಯಿಂದ ಬಾಳಿಲ ರಸ್ತೆಯ ಮೂಲಕ ತೆರಳಿ ಅಯ್ಯನಕಟ್ಟೆ ಕ್ರಾಸ್‌ನಲ್ಲಿ ಬಲಗಡೆ ತಿರುಗಿ 6.4 ಕಿಮೀ ಸಾಗಿದರೆ ದೇವಾಲಯವನ್ನು ತಲುಪಬಹುದು.**

"ಚೊಕ್ಕಾಡಿಗೆ ಸರಿಯಾದ ಸರ್ಕಾರಿ ಬಸ್ ಸೌಲಭ್ಯ ಲಭ್ಯವಿಲ್ಲದ ಕಾರಣ, ನಿಮ್ಮ ಸ್ವಂತ ವಾಹನವನ್ನು ಬಳಸುವುದು ಉತ್ತಮ ಅಥವ ಬೆಳ್ಳಾರೆಯಿಂದ ಚೊಕ್ಕಾಡಿಗೆ ಸಂಚರಿಸುವ ಖಾಸಗಿ ವ್ಯಾನ್‌ಗಳನ್ನು ಬಳಸಿಕೊಂಡು ದೇವಾಲಯವನ್ನು ತಲುಪಬಹುದು."

"ಸರಕಾರದ ಬಸ್ ಸೇವೆಗಳು ಚೊಕ್ಕಾಡಿಗೆ ಸೀಮಿತವಾಗಿದ್ದರೂ, ಪುತ್ತೂರಿನಿಂದ ಚೊಕ್ಕಾಡಿಗೆ ನಾಲ್ಕು ದೈನಂದಿನ ಬಸ್‌ಗಳು ಮತ್ತು ಸುಳ್ಯಕ್ಕೆ ನಾಲ್ಕು ಬಸ್‌ಗಳು ಲಭ್ಯವಿವೆ. ಈ ಬಸ್‌ ಸೇವೆಗಳು ದಿನನಿತ್ಯ ಬದಲಾಗುವ ಅಥವಾ ರದ್ದಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ."
  ],
};

const titles: Record<LocaleType, string> = {
  en: "How to Reach Shri Harihareshwara Temple",
  kn: "ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನ ತಲುಪುವ ದಾರಿ",
};

const How_to_reach: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;

  const messages = howToReachMessages[currentLocale];
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-[var(--background)] font-serif">
      <h1 className="text-center text-3xl font-bold mb-6 text-[var(--primary)]">
        {titles[currentLocale]}
      </h1>
      <div className="max-w-2xl mx-auto bg-[var(--card-background)] p-8 rounded-lg shadow-lg">
        {messages.map((para: string, index: number) => (
          <p
            key={index}
            className="text-[var(--text)] leading-relaxed text-lg mb-4 text-justify"
          >
            {para}
          </p>
        ))}
      </div>
    </main>
  );
};

export default How_to_reach;
