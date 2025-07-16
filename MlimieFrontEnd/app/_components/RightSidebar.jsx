"use client";

import { weeklyWeatherData } from "../data/weeklyWeatherData";

export default function RightSideNavBar() {
  return (
    <div className="w-54 bg-gradient-to-t to-yellow-50 from-green-100 p-4 fixed right-0 top-0 bottom-0 overflow-auto flex flex-col h-[500px] rounded-md shadow-xl">
      <h2 className="text-lg font-semibold mb-2">Weekly Forecast</h2>
      <h3 className="text-md font-medium mb-4">Blantyre, Malawi, 22°C</h3>
      <div className="flex flex-col">
        {weeklyWeatherData.map((dayData, index) => (
          <div key={index} className="flex items-center mb-2">
            <span
              className="text-2xl"
              style={{ color: getIconColor(dayData.temperature) }}
            >
              {dayData.icon}
            </span>
            <div className=" flex flex-col ml-3">
              <span className=" text-sm">{dayData.day}</span>
              <span className="ml-2  text-green-700 text-xm">22°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Function to determine the icon color based on temperature
function getIconColor(temperature) {
  if (temperature > 27) {
    return "red"; // Hot
  } else if (temperature >= 22) {
    return "yellow"; // Warm
  } else {
    return "blue"; // Cool
  }
}
