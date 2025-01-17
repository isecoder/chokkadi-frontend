"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { changeLocale } from "../store/localeSlice";

// Define a type for the locales
type LocaleType = "en" | "kn";

const historicalMessages: Record<LocaleType, string[]> = {
  en: [
    "According to historical accounts, thousands of years ago, a sage on his journey arrived in a town called Pallattadka, where he was delighted to see the confluence of three rivers. In that sacred spot, he installed the deity of Lord Rama and began worshipping him.",
    "It is believed that approximately five thousand years ago, great sages performed a special yaga (ritual sacrifice) on the eastern side of the temple to defeat demons. For this yaga, sacred water (theertha) was brought from thousands of holy places across the Indian continent and used in the rituals. According to legend, after the demons were vanquished, the sages who performed the yaga poured the sacred water from their kamandala (water vessels) into a nearby river. This river, originating from the Sidda (Shesha) Parvatha mountain, is famously known as Koti Theertha. It is believed that bathing in this river’s confluence and receiving the darshan (vision) of Lord Rama can cure diseases, mental illnesses, and skin ailments without the need for medication.",
    "This sacred site, where sages once meditated, is also known for the powerful effects of performing Shani Pooja (worship of the deity Saturn). On the day of Tula Sankramana (a Hindu festival), it is believed that the holy water, or theerthodbhava, emerges at the confluence of Shri Rama Sangam. Thousands of devotees gather on this day to bathe in the sacred waters and offer pinda pradhana (ritual offerings) to their ancestors. Even today, devotees follow the tradition of bathing in the holy waters at the start of the Tula month.",
    "This kshetra (holy place), renowned as Triveni Sangam Kshetra, is where the sacred confluence occurs, similar to the theerthodbhava at Talakaveri. It is a rare and unique shrine where both Hari (Vishnu) and Hara (Shiva) are conceptualized within the same idol in the form of a Linga. This temple is one of the few shrines in India that boasts such distinct characteristics. Devotees believe that their desires will be fulfilled and their sins absolved through worship here. Pilgrims come from both near and far to bathe in the sacred waters and receive the darshan of the deity.",
    "It is said that the current stone idol, in the form of a Linga, was brought and installed around 800 years ago by the Lingayat kings from North Karnataka. After the decline of the Ballala dynasty, the temple came under the rule of the Kodagu kings. During the state administration period, the temple was granted significant agricultural land, which is an important part of its historical legacy.",
  ],
  kn: [
    "ಶ್ರೀ ಹರಿಹರೇಶ್ವರ  ದೇವಸ್ಥಾನವು ಅನಾದಿ ಕಾಲದಿಂದಲೂ ಇದ್ದು ಋಷಿ ಶ್ರೇಷ್ಠರು ಈ ತೀರ್ಥಕ್ಷೇತ್ರದಲ್ಲಿ ತಪಸ್ಸನ್ನಾಚರಿಸಿ ಹರಿ ಮತ್ತು ಹರ ಇಬ್ಬರನ್ನು ಒಂದೇ ಮೂರ್ತಿಯಲ್ಲಿ ಸಂಕಲ್ಪಿಸಿ ಸ್ಥಾಪಿಸಿದ ಕ್ಷೇತ್ರವೇ ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ದೇವಾಲಯ.",
    "ದೇವಾಲಯದ ಪೂರ್ವದಿಕ್ಕಿನಲ್ಲಿರುವ ಪರ್ವತದಲ್ಲಿ ಸುಮಾರು ಐದು ಸಾವಿರ ವರುಷಗಳಿಗೂ ಹಿಂದೆ ರಾಕ್ಷಸರ ನಿಗ್ರಹಕ್ಕಾಗಿ ಮುನಿ ಶ್ರೇಷ್ಠರು ವಿಶಿಷ್ಟವಾದ ಯಾಗವನ್ನು ಮಾಡಿದ್ದರೆಂದೂ, ಆ ಯಾಗಕ್ಕೆ ಭರತ ಖಂಡದ ಸಹಸ್ರಾರು ಪುಣ್ಯ ಕ್ಷೇತ್ರಗಳಿಂದ ತೀರ್ಥವನ್ನು ತಂದು ಯಾಗಕ್ಕೆ ಬಳಸಿದ್ದರೆನ್ನಲಾಗುತ್ತಿದೆ. ರಾಕ್ಷಸರ ಸಂಹಾರವಾದ ಬಳಿಕ ಯಾಗವನ್ನು ನಡೆಸಿದ ಮುನಿಗಳು ತಮ್ಮ ಕಮಂಡಲುಗಳ ವೇದೋದಕಗಳನ್ನು ನದಿಗೆ ಎರೆದರೆನ್ನುವ ದಂತಕಥೆಯಿದೆ. ಸಿದ್ಧ ಪರ್ವತದಿಂದ ಹರಿದು ಬರುವ ನದಿಯು ”ಕೋಟಿ ತೀರ್ಥ”ವೆಂದು ಪ್ರಸಿದ್ದಿಯಾಗಿದೆ. ಈ ನದಿಯು ಸಂಗಮವಾಗುವ ಹರಿಹರೇಶ್ವರ ದೇವಸ್ಥಾನದ ಕ್ಷೇತ್ರದಲ್ಲಿ ಪುಣ್ಯಸ್ನಾನ ಮಾಡಿ ಹರಿಹರೇಶ್ವರನ ದರುಶನ ಪಡೆಯುವುದರಿಂದ ಔಷಧಿ ರಹಿತವಾಗಿ ಕಾಯಿಲೆಗಳು, ಮನೋರೋಗಗಳು, ಚರ್ಮರೋಗಾದಿಗಳು ವಾಸಿಯಾಗುತ್ತವೆ ಎಂಬ ನಂಬಿಕೆ ಇದೆ.ಋಷಿ ಮುನಿಗಳು ತಪಸ್ಸುಗೈದ ಪಾವನ ಸ್ಥಳವು ಈ ಕೇತ್ರವಾಗಿದ್ದು ಇಲ್ಲಿ ಮಾಡಿಸಿದ ಶನಿಪೂಜೆಗೆ ವಿಶೇಷ ಶಕ್ತಿ ಇರುತ್ತದೆ. ಅಲ್ಲದೇ ಸಕಲ ಪಾಪ ನಿವಾರಣೆಯಾಗಿ ಮುಕ್ತಿಯನ್ನು ಕರುಣಿಸುವ ಕ್ಷೇತ್ರವೆಂದು ಭಕ್ತರ ಅಚಲವಾದ ನಂಬಿಕೆಯಾಗಿದೆ ಜೊತೆಗೆ ಸಹಸ್ರಾರು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುವ ಕ್ಷೇತ್ರವು ಆಗಿದೆ.",
    "ಶ್ರೀ ಹರಿಹರೇಶ್ವರ ಸಂಗಮದಲ್ಲಿ ತುಲಾ ಸಂಕ್ರಮಣದ ದಿನ ತೀರ್ಥೋದ್ಭವವಾಗುತ್ತದೆ ಎಂಬ ನಂಬಿಕೆಯಿದೆ. ಆ ದಿನದಂದು ಭಕ್ತಾದಿಗಳು ಸಹಸ್ರಾರು ಸಂಖ್ಯೆಯಲ್ಲಿ ತೀರ್ಥಸ್ನಾನ ಮಾಡುತ್ತಾರೆ ಹಾಗೂ ಪಿತೃಗಳಿಗೆ ಪಿಂಡಪ್ರದಾನವನ್ನು ಮಾಡುತ್ತಾರೆ. ಈಗಲೂ ತುಲಾ ಮಾಸಾರಂಭದ ದಿನ ಭಕ್ತಾದಿಗಳು ಬಂದು ತೀರ್ಥಸ್ನಾನ ಮಾಡುವ ಪದ್ದತಿ ರೂಢಿಯಲ್ಲಿದೆ.",
    "ಹರಿ ಮತ್ತು ಹರರು ಒಂದೇ ಬಿಂಬದಲ್ಲಿ(ಲಿಂಗರೂಪ) ಸಂಕಲ್ಪಿಸಲ್ಟಟ್ಟ ವಿರಳವಾದ ವಿಶಿಷ್ಟವಾದ ಕ್ಷೇತ್ರ ಇದಾಗಿದೆ. ಹಲವಾರು ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೊಂದಿರುವ ಭಾರತದ ಕೆಲವೇ ಪುಣ್ಯಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಇದೂ ಒಂದಾಗಿದೆ. ಭಕ್ತರ ಇಷ್ಟಾರ್ಥ ಸಿದ್ಧಿಯಾಗಿ, ಪಾಪನಾಶಕವಾಗುತ್ತದೆ. ದೇವಾಲಯಕ್ಕೆ ಸ್ಥಳೀಯರಲ್ಲದೇ ದೂರದ ಊರುಗಳಿಂದಲೂ ಭಕ್ತಾದಿಗಳು ಬಂದು ಈ ಪುಣ್ಯ ಕೇತ್ರದಲ್ಲಿ ತೀರ್ಥಸ್ನಾನ ಮಾಡಿ ದೇವರ ದರ್ಶನ ಪಡೆದು ಕೃತಾರ್ಥರಾಗುತ್ತಿರುತ್ತಾರೆ.",
    "ಪ್ರಸ್ತುತ ಇರುವ ಶಿಲಾಮೂರ್ತಿಯು ಲಿಂಗಸ್ವರೂಪಿಯಾಗಿದ್ದು ಸುಮಾರು 800 ವರ್ಷಗಳ ಹಿಂದೆ ಉತ್ತರ ಕರ್ನಾಟಕದಿಂದ ಲಿಂಗಾಯತ ಅರಸರು ತಂದು ಸ್ಥಾಪಿಸಿದರು ಎಂದು ಪ್ರತೀತಿ. ಆನಂತರದಲ್ಲಿ ಆಡಳಿತ ನಡೆಸಿದ ಬಲ್ಲಾಳರ ಆಡಳಿತವು ಕೊನೆಗೊಂಡ ಬಳಿಕ ಕೊಡಗಿನ ಅರಸರ ಆಡಳಿತದಲ್ಲಿತ್ತು. ವಿವಿಧ ರಾಜರ ಆಡಳಿತದ ಕಾಲದಲ್ಲಿ ದೇವಾಲಯಕ್ಕೆ ಸಾಕಷ್ಟು ಕೃಷಿ ಭೂಮಿಯನ್ನು ಬಳುವಳಿಯಾಗಿ ನೀಡಲಾಗಿತ್ತು ಇದು ಈ ದೇವಾಲಯದ ಇತಿಹಾಸವನ್ನು ಸಾರುತ್ತದೆ.",
  ],
};

const titles: Record<LocaleType, string> = {
  en: "Historical Significance",
  kn: "ಇತಿಹಾಸ",
};

export default function About() {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocale: LocaleType = useSelector(
    (state: RootState) => state.locale.locale
  ) as LocaleType;

  const messages = historicalMessages[currentLocale];
  const [isLocaleLoaded, setIsLocaleLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") || "en") as LocaleType;
    dispatch(changeLocale(savedLocale));
    setIsLocaleLoaded(true);
  }, [dispatch]);

  if (!isLocaleLoaded) return null; // Prevent rendering until locale is loaded

  return (
    <main className="min-h-screen flex flex-col items-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">{titles[currentLocale]}</h1>
      <div className="max-w-2xl mx-auto">
        {messages.map((para: string, index: number) => (
          <p key={index} className="text-lg mb-4 text-justify">
            {para}
          </p>
        ))}
      </div>
    </main>
  );
}
