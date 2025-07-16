import { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

export default function SeedQualityForm() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 1) {
      alert("Maximum 1 image allowed");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-xl w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Plant Monitor
      </h2>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 text-center cursor-pointer hover:border-green-400 transition-colors"
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
          <p className="text-sm text-gray-400">Upload an image (PNG, JPG)</p>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Samples ({images.length}/1)
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Seed sample ${index + 1}`}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={images.length === 0}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
            images.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Analyze Plants
        </button>
      </div>
    </div>
  );
}
