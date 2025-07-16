"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CropRecommendationDashboard({
  formData,
  city,
  onReset,
}) {
  const chartRef = useRef(null); // Reference to keep track of the chart instance
  const canvasRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Maize", "Wheat", "Rice"],
        datasets: [
          {
            label: "Suitability",
            data: [85, 70, 90], // Dummy data
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
      },
    });

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [formData, city]); // Recreate chart when formData or city changes

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mr-[100px]">
      <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Crop Recommendation for {city}
        </h2>

        <div className="mb-4">
          <p>Based on the soil data you provided:</p>
          <ul className="list-disc ml-5">
            <li>Soil pH: {formData.soilPH}</li>
            <li>Soil Moisture: {formData.soilMoisture}</li>
            <li>Soil Temperature: {formData.soilTemperature}</li>
            <li>Soil Type/Name: {formData.soilType}</li>
          </ul>
        </div>

        <div
          className="mb-4"
          style={{ position: "relative", height: "400px", width: "100%" }}
        >
          <canvas ref={canvasRef} id="cropChart"></canvas>
        </div>

        <div className="mb-4 pl-8">
          <h3 className="text-lg font-semibold">Recommended Crops:</h3>
          <ul className="list-disc -ml-5">
            <li>
              <strong>Maize</strong>: Suitable due to its tolerance to a wide
              range of soil pH and high adaptability to various moisture levels.
              Great for areas with moderate to high temperatures.
            </li>
            <li>
              <strong>Wheat</strong>: Prefers well-drained soils with moderate
              pH. It is moderately suitable in areas with consistent moisture
              and temperatures ranging from cool to warm.
            </li>
            <li>
              <strong>Rice</strong>: Thrives in areas with high moisture and
              slightly acidic to neutral pH. Best suited for warm climates with
              plenty of water.
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
