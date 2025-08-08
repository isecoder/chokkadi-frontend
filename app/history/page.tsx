"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define a type for the locales
type LocaleType = "en" | "kn";

const messages: Record<LocaleType, string> = {
  en: "Chokkadi, one of the notable villages in the Talapady region of Mangalore, is home to the ancient and beautifully constructed Sri Rama Temple. Its origins date back to very early times, with mentions found in traditional legends. The temple’s gopuram (tower), prakara (enclosure), mantapas (halls), and sanctum are all unique in their architectural style. Annual festivals, special celebrations, and daily rituals are conducted here with deep devotion.The presiding deity is Lord Sri Ramachandra, with Lakshmana on His right and Goddess Sita on His left. During festival seasons, grand religious and cultural programs take place. The temple serves as a central point for unity, cooperation, and devotion among the people of the village.Historical records show that the temple has been famous since the times of several royal dynasties and has received support from many kings. Particularly during the Chola dynasty, major renovations were carried out. In later years, several rulers, spiritual heads, and local donors contributed to its growth.Festivals like Ramanavami, Hanuman Jayanti, and Deepotsava attract devotees from all neighboring villages. In the month of Shravana, special poojas, Harikathas, devotional singing, and community feasts are organized.",
  kn: "ಮಂಗಳೂರು ತಾಲ್ಲೂಕಿನ ತಾಳಾಪಾಡಿ ಪ್ರದೇಶದ ಪ್ರಮುಖ ಗ್ರಾಮಗಳಲ್ಲಿ ಚೊಕ್ಕಾಡಿ ಒಂದು. ಈ ಊರಿನ ಶ್ರೀರಾಮ ದೇವಸ್ಥಾನವು ಪುರಾತನ ಮತ್ತು ಸುಂದರವಾಗಿ ನಿರ್ಮಿತವಾಗಿದೆ. ಇದರ ಸ್ಥಾಪನೆ ಬಹಳ ಹಳೆಯ ಕಾಲದಲ್ಲೇ ನಡೆದಿದ್ದು, ಪುರಾಣಗಳಲ್ಲಿ ಉಲ್ಲೇಖವಿದೆ. ದೇವಾಲಯದ ಗೋಪುರ, ಪ್ರಾಕಾರ, ಮಂಟಪಗಳು, ಗರ್ಭಗೃಹ—allವು ಶೈಲಿಯಲ್ಲಿ ವೈಶಿಷ್ಟ್ಯಮಯವಾಗಿವೆ. ವಾರ್ಷಿಕ ಉತ್ಸವಗಳು, ವಿಶೇಷ ಹಬ್ಬಗಳು ಹಾಗೂ ನಿತ್ಯ ಪೂಜಾಕಾರ್ಯಗಳು ಇಲ್ಲಿ ಭಕ್ತಿಭಾವದಿಂದ ನಡೆಯುತ್ತವೆ.ಈ ದೇವಸ್ಥಾನದ ಮುಖ್ಯ ದೈವ ಶ್ರೀರಾಮಚಂದ್ರನ ಮೂರ್ತಿ, ಬಲಗಡೆಯಲ್ಲಿ ಲಕ್ಷ್ಮಣ, ಎಡಗಡೆಯಲ್ಲಿ ಸೀತಾ ದೇವಿಯ ಮೂರ್ತಿಗಳೊಂದಿಗೆ ಅಲಂಕರಿಸಲಾಗಿದೆ. ಉತ್ಸವಕಾಲದಲ್ಲಿ ಧಾರ್ಮಿಕ ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ವೈಭವದಿಂದ ನಡೆಯುತ್ತವೆ. ಈ ದೇವಸ್ಥಾನವು ಊರಿನ ಜನರ ಏಕತೆ, ಸಹಕಾರ ಮತ್ತು ಭಕ್ತಿಭಾವಕ್ಕೆ ಕೇಂದ್ರಬಿಂದುವಾಗಿದೆ.ಇತಿಹಾಸವನ್ನು ಪರಿಶೀಲಿಸಿದರೆ, ಈ ದೇವಸ್ಥಾನವು ಹಲವು ರಾಜವಂಶಗಳ ಕಾಲದಿಂದಲೂ ಪ್ರಸಿದ್ಧವಾಗಿದ್ದು, ಅನೇಕ ರಾಜರಿಂದ ನೆರವು ಪಡೆದಿದೆ. ವಿಶೇಷವಾಗಿ, ಚೋಳ ವಂಶದ ಆಡಳಿತಾವಧಿಯಲ್ಲಿ ದೊಡ್ಡ ಮಟ್ಟದ ಪುನರ್ ನಿರ್ಮಾಣ ನಡೆದಿದೆ. ನಂತರ ಹಲವಾರು ರಾಜರು, ಮಠಾಧೀಶರು ಹಾಗೂ ಸ್ಥಳೀಯ ದಾನಿಗಳು ದೇವಸ್ಥಾನದ ಅಭಿವೃದ್ಧಿಗೆ ಕೊಡುಗೆ ನೀಡಿದ್ದಾರೆ.ಇಲ್ಲಿ ರಾಮನವಮಿ, ಹನುಮ ಜಯಂತಿ, ದೀಪೋತ್ಸವ ಮುಂತಾದ ಹಬ್ಬಗಳು ಸುತ್ತಮುತ್ತಲಿನ ಎಲ್ಲಾ ಗ್ರಾಮಗಳಿಂದ ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತವೆ. ಶ್ರಾವಣ ಮಾಸದಲ್ಲಿ ವಿಶೇಷ ಪೂಜೆಗಳು, ಹರಿಕಥೆ, ಭಜನ ಹಾಗೂ ಅನ್ನಸಂತರ್ಪಣೆ ಕಾರ್ಯಕ್ರಮಗಳು ನಡೆಯುತ್ತವೆ."
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
