import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Hall } from "../booking/types";
import Calendar from "./Calendar";

interface HallListProps {
  halls: Hall[];
  onDateSelect: (hallId: number, date: string) => void;
}

const HallList: React.FC<HallListProps> = ({ halls, onDateSelect }) => {
  // Get the current locale from Redux
  const { locale } = useSelector((state: RootState) => state.locale);

  return (
    <div className="grid grid-cols-1 gap-4 justify-center">
      {halls.map((hall) => (
        <div
          key={hall.hall_id}
          className="border p-4 rounded-lg text-center shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            {locale === "en" ? hall.name : hall.name_kannada}
          </h2>
          <p className="text-gray-600 text-sm">
            {locale === "en" ? hall.description : hall.description_kannada}
          </p>
          <div className="mt-2">
            {hall.images.length > 0 ? (
              hall.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={hall.name}
                  className="w-full rounded-lg"
                  width={500}
                  height={300}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">
              {locale === "en" ? "Availability Calendar" : "ಲಭ್ಯತೆ ಕ್ಯಾಲೆಂಡರ್"}
            </h3>
            <Calendar hallId={hall.hall_id} onDateSelect={onDateSelect} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HallList;
