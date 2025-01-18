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
    "One can visit Shri Kshetra, which is 8 km from Kukke Subrahmanya, a famous religious site of the state, while coming to Subrahmanya. Shri Harihareshwara Temple can be reached if you take Sulya road from Subrahmanya and turn left at Malayala and go for 5 km.",
    "Since there is no proper government bus service from Subrahmanya to Hariharapallattadka, travelling with your own vehicle to Shri Temple is preferred, or else you can arrange a vehicle from Subrahmanya. Sufficient KSRTC buses are available from Sulya, the taluk center, to Hariharapallattadka (Buses to Balgodu, Kollamogra).",
    "Besides, there are 4 daily buses from Puttur to Balugodu and 1 evening bus to Kollamogra. If you take a bus from Subrahmanya to Nadugallu, from there you can also take a bus towards Hariharapallattadka to reach Shri Harihareshwara Temple.",
  ],
  kn: [
    "ರಾಜ್ಯದ ಪ್ರಸಿದ್ಧ ಧಾರ್ಮಿಕ ಕ್ಷೇತ್ರವಾದ ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ 8 ಕಿ.ಮಿ ದೂರದಲ್ಲಿರುವ ಶ್ರೀ ಕ್ಷೇತ್ರಕ್ಕೆ ತಾವು ಸುಬ್ರಹ್ಮಣ್ಯಕ್ಕೆ ಬಂದಾಗ ಭೇಟಿ ನೀಡಬಹುದು. ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ ಸುಳ್ಯ ಮಾರ್ಗದಲ್ಲಿ ಸಾಗಿ ಮಲೆಯಾಳ ಎಂಬಲ್ಲಿ ಎಡ ಭಾಗಕ್ಕೆ ತಿರುಗಿ 5 ಕಿ.ಮಿ ಸಾಗಿದರೆ ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನ ತಲುಪಬಹುದಾಗಿದೆ.",
    "ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ ಹರಿಹರಪಲ್ಲತ್ತಡ್ಕ ಭಾಗಕ್ಕೆ ಸರಿಯಾಗಿ ಸರಕಾರಿ ಬಸ್ಸು ಸೇವೆ ಇಲ್ಲದಿರುವ ಕಾರಣ ನೀವು ಶ್ರೀ ದೇವಸ್ಥಾನಕ್ಕೆ ನಿಮ್ಮ ಸ್ವಂತ ವಾಹನ ಇಲ್ಲದಿದ್ದರೆ ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ ಬದಲು ವಾಹನ ವ್ಯವಸ್ಥೆ ಮಾಡಿ ತಲುಪಬಹುದಾಗಿದೆ. ತಾಲೂಕು ಕೇಂದ್ರವಾದ ಸುಳ್ಯದಿಂದ ಹರಿಹರಪಲ್ಲತ್ತಡ್ಕಕ್ಕೆ (ಬಾಳುಗೋಡು, ಕೊಲ್ಲಮೊಗ್ರಕ್ಕೆ ಸಾಗುವ ಬಸ್ಸುಗಳು)ಬೇಕಾದಷ್ಟು ಸರಕಾರಿ ಬಸ್ಸುಗಳ ಸೇವೆಯಿದೆ.",
    "ಜೊತೆಗೆ ಪುತ್ತೂರಿನಿಂದ ಪ್ರತಿದಿನ 4 ಬಸ್ಸುಗಳು ಬಾಳುಗೋಡಿಗೆ ಹಾಗು ಸಂಜೆ 1 ಬಸ್ಸು ಕೊಲ್ಲಮೊಗ್ರಕ್ಕೆ ಸರಕಾರಿ ಬಸ್ಸು ಸೇವೆಯಿದೆ. ಸುಬ್ರಹ್ಮಣ್ಯದಿಂದ ಬಸ್ಸಿನಲ್ಲಿ ನಡುಗಲ್ಲು ಎಂಬಲ್ಲಿಗೆ ಬಂದರೆ ಅಲ್ಲಿಂದ ಹರಿಹರಪಲ್ಲತ್ತಡ್ಕ ಕಡೆಗೆ ಹೋಗುವ ಬಸ್ಸಿನಲ್ಲಿ ಸಹ ನೀವು ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನ ತಲುಪಬಹುದಾಗಿದೆ.",
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
