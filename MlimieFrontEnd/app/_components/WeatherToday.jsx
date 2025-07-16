import { Thermometer, Wind, Droplet, Cloud, MapPinIcon } from "lucide-react";

export default function WeatherToday({ weatherData, city }) {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, wind, weather } = weatherData;

  const tempCelsius = ((main.temp - 32) * 5) / 9;
  const feelsLikeCelsius = ((main.feels_like - 32) * 5) / 9;

  const getWeatherAdvice = () => {
    let advice = "General farming advice: ";

    if (tempCelsius > 30) {
      advice +=
        "It's quite hot today, ensure your crops are well-watered and consider mulching to retain soil moisture. ";
    } else if (tempCelsius < 10) {
      advice +=
        "It's quite cold today, consider protecting young plants from frost. ";
    }

    if (main.humidity > 80) {
      advice +=
        "High humidity can increase the risk of fungal diseases, ensure good air circulation around your plants. ";
    } else if (main.humidity < 30) {
      advice +=
        "Low humidity can lead to plant dehydration, make sure to water your crops adequately. ";
    }

    if (wind.speed > 10) {
      advice +=
        "High winds detected, secure any loose structures and protect young plants from wind damage. ";
    }

    if (weather[0].description.includes("rain")) {
      advice +=
        "Rain is expected, make sure your irrigation systems are turned off to prevent overwatering. ";
    } else if (weather[0].description.includes("clear")) {
      advice +=
        "Clear skies today, it's a good day for fieldwork and planting. ";
    }

    return advice;
  };

  return (
    <main className="p-4 flex flex-col w-full">
      <h1 className="text-xl mb-4 font-semibold">Current Weather</h1>
      <div className="flex items-center mb-4 text-green-700">
        <MapPinIcon className="inline-block mr-2" />
        <h3 className="text-xl font-semibold first-letter:capitalize">
          {city}
        </h3>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 w-1/2">
        <div className="flex items-center mb-4">
          <Thermometer className="w-6 h-6 text-green-700 mr-2" />
          <div>
            <div className="text-lg font-medium">Temperature</div>
            <div className="text-gray-700">{tempCelsius.toFixed(1)}°C</div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Thermometer className="w-6 h-6 text-green-700 mr-2" />
          <div>
            <div className="text-lg font-medium">Feels Like</div>
            <div className="text-gray-700">{feelsLikeCelsius.toFixed(1)}°C</div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Droplet className="w-6 h-6 text-green-700 mr-2" />
          <div>
            <div className="text-lg font-medium">Humidity</div>
            <div className="text-gray-700">{main.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Wind className="w-6 h-6 text-green-700 mr-2" />
          <div>
            <div className="text-lg font-medium">Wind Speed</div>
            <div className="text-gray-700">{wind.speed} m/s</div>
          </div>
        </div>
        {weather.length > 0 && (
          <div className="flex items-center">
            <Cloud className="w-6 h-6 text-green-700 mr-2" />
            <div>
              <div className="text-lg font-medium">Weather</div>
              <div className="text-gray-700 capitalize">
                {weather[0].description}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-green-100 shadow-lg rounded-lg p-4 w-1/2 mt-4">
        <h2 className="text-lg font-medium">Weather Advice</h2>
        <p className="text-gray-700">{getWeatherAdvice()}</p>
      </div>
    </main>
  );
}
