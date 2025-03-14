"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const SevasList = (): JSX.Element => {
  const showKannada = useSelector(
    (state: RootState) => state.locale.locale === "kn"
  );

  const sevas = [
    showKannada
      ? "ಪ್ರತೀ ಹುಣ್ಣಿಮೆಯಂದು ಶ್ರೀದೇವಾಲಯದಲ್ಲಿ ದುರ್ಗಾಪೂಜೆ ನಡೆಯುವುದು. ಪೂಜಾ ಸಮಯ ಸಂಜೆ 7:30"
      : "Durga Pooja on every Poornima at 7:30 PM",
    showKannada
      ? "ಪ್ರತೀ ಶುಕ್ಲ ಪಕ್ಷದ ಚೌತಿಯಂದು ಗಣಪತಿ ಹವನ ನಡೆಯುವುದು. ಪೂರ್ಣಾಹುತಿ ಸಮಯ ಬೆಳಿಗ್ಗೆ 9:30"
      : "Ganapati Havana on every Shukla Paksha Chaturthi at 9:30 AM",
    showKannada
      ? "ಪ್ರತಿ ಶನಿವಾರ ಆಂಜನೇಯನಿಗೆ ವಿಶೇಷ ಸೇವೆ ನಡೆಯುವುದು."
      : "Special Pooja Seve for Hanuman every Saturday",
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-white to-orange-100">
      <ul className="mt-24 list-disc font-bold text-lg text-gray-800">
        {sevas.map((seva, index) => (
          <li key={index} className="mb-2">{seva}</li>
        ))}
      </ul>
    </div>
  );
};

export default SevasList;
