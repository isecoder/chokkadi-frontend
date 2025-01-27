import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaCalendar } from "react-icons/fa";

interface CalendarProps {
  hallId: number;
  onDateSelect: (hallId: number, date: string) => void;
}

interface AvailabilityData {
  date: string;
  reason: string;
  isBooked: boolean;
}

interface APIResponse {
  statusCode: number;
  message: string;
  data: {
    date: string;
    reason: string;
    is_booked: boolean;
    hall: {
      hall_id: number;
      name: string;
    };
  }[];
}

const Calendar: React.FC<CalendarProps> = ({ hallId, onDateSelect }) => {
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>(
    []
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      const response = await fetch(`/api/halls/availability`);
      const result: APIResponse = await response.json();

      if (result.statusCode === 200) {
        const dataForHall = result.data
          .filter((item) => item.hall.hall_id === hallId)
          .map((item) => ({
            date: item.date.split("T")[0],
            reason: item.reason || "Available",
            isBooked: item.is_booked,
          }));
        setAvailabilityData(dataForHall);
      } else {
        console.error("Failed to fetch availability data");
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  }, [hallId]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Close the dropdown if the click is outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePrevMonth = () => {
    if (
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    const today = new Date();
    const maxMonth = today.getMonth() + 36;
    const maxYear = today.getFullYear() + Math.floor(maxMonth / 12);

    if (currentMonth === maxMonth % 12 && currentYear === maxYear) {
      return;
    }
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Available":
        return "text-green-500";
      case "On hold":
        return "text-orange-500";
      case "Booked":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getDaysInMonth = (month: number, year: number): string[] => {
    const days = [];
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const startDay = startDate.getDay();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    for (let i = 0; i < startDay; i++) {
      days.push("");
    }

    for (
      let date = new Date(year, month, 1);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const currentDate = new Date(date);

      if (
        currentDate.getMonth() !== today.getMonth() &&
        currentDate.getDate() === 1
      ) {
        continue;
      }

      if (currentDate >= tomorrow) {
        days.push(currentDate.toISOString().split("T")[0]);
      }
    }

    const nextMonthFirstDay = new Date(year, month + 1, 1);
    days.push(nextMonthFirstDay.toISOString().split("T")[0]);

    while (days.length < 35) {
      days.push("");
    }

    return days;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
  <button
    onClick={handlePrevMonth}
    className={`px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium ${
      currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
        ? "cursor-not-allowed opacity-50"
        : ""
    }`}
    disabled={
      currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
    }
  >
    Previous
  </button>

  <div className="flex items-center gap-2 max-w relative" ref={dropdownRef}>
    <button
      className="px-6 py-2 bg-[#ff9718] rounded-lg hover:bg-orange-300 relative"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <span className="flex items-center gap-1 text-white font-medium">
        {new Date(currentYear, currentMonth).toLocaleString("default", {
          month: "short",
        })}{" "}
        {currentYear}
        <FaCalendar className="w-4 h-4 text-black" />
      </span>
    </button>

    {showDropdown && (
      <div className="absolute  bg-white border rounded-lg shadow-lg p-4 mt-2 w-full max-w-xs sm:max-w-sm md:max-w-md top-full left-0">
        <div className="flex flex-col gap-4">
          <div
            className="border rounded-lg overflow-y-auto"
            style={{
              maxHeight: "10rem", 
            }}
          >
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              className="px-2 py-1 border rounded-lg w-full"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div
            className="border rounded-lg overflow-y-auto"
            style={{
              maxHeight: "5rem", 
            }}
          >
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="px-2 py-1 border rounded-lg w-full"
            >
              {Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - 20 + i)
                .filter((year) => year >= new Date().getFullYear())
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowDropdown(false)}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
        >
          Go
        </button>
      </div>
    )}
  </div>

  <button
    onClick={handleNextMonth}
    className={`px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800 font-medium ${
      currentMonth === (new Date().getMonth() + 36) % 12 &&
      currentYear === new Date().getFullYear() + Math.floor((new Date().getMonth() + 36) / 12)
        ? "cursor-not-allowed opacity-50"
        : ""
    }`}
    disabled={
      currentMonth === (new Date().getMonth() + 36) % 12 &&
      currentYear === new Date().getFullYear() + Math.floor((new Date().getMonth() + 36) / 12)
    }
  >
    Next
  </button>
</div>


      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center font-medium">
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => {
          if (!day) {
            return <div key={index} className="text-center"></div>;
          }

          const availability = availabilityData.find(
            (data) => data.date === day
          );
          const isToday =
            new Date(day).toDateString() === new Date().toDateString();

          return (
            <div key={day} className="text-center">
              <button
                onClick={() =>
                  !availability?.isBooked &&
                  availability?.reason !== "On hold" &&
                  !isToday &&
                  onDateSelect(hallId, day)
                }
                className={`p-2 rounded-lg w-full ${
                  availability?.isBooked
                    ? "bg-red-100 cursor-not-allowed"
                    : availability?.reason === "On hold"
                    ? "bg-orange-100 cursor-not-allowed"
                    : "bg-green-100 hover:bg-green-200"
                }`}
                disabled={
                  availability?.isBooked ||
                  availability?.reason === "On hold" ||
                  isToday
                }
              >
                <span>{new Date(day).getDate()}</span>
              </button>
              {availability && (
                <div
                  className={`text-xs mt-1 font-medium ${getReasonColor(
                    availability.reason
                  )}`}
                >
                  {availability.reason}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
