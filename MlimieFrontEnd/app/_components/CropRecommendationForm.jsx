"use client";

import { useState, useRef } from "react";
import { X, Upload } from "lucide-react";

export default function CropRecommendationForm({ onSave }) {
  const [images, setImages] = useState([]);
  const [soilPH, setSoilPH] = useState("");
  const [soilMoisture, setSoilMoisture] = useState("");
  const [soilTemperature, setSoilTemperature] = useState("");
  const [soilType, setSoilType] = useState("");
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      soilPH,
      soilMoisture,
      soilTemperature,
      soilType,
      images,
    };
    onSave(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Crop Recommendation
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Soil pH
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
              placeholder="Enter soil pH"
              value={soilPH}
              onChange={(e) => setSoilPH(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Soil Moisture
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
              placeholder="Enter soil moisture"
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Soil Temperature
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
              placeholder="Enter soil temperature"
              value={soilTemperature}
              onChange={(e) => setSoilTemperature(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Soil Type/Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
              placeholder="Enter soil type or name"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Images
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition-colors"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
            />
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-gray-600 mb-1">Click to upload</p>
              <p className="text-sm text-gray-400">Upload image (PNG, JPG)</p>
            </div>
          </div>
        </div>

        {/* image previews */}
        {images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Uploaded Samples ({images.length}/1)
            </h3>
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          Save
        </button>
      </form>
    </div>
  );
}
