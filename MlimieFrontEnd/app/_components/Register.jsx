import React, { useState } from "react";
import { CheckCircle, X, Eye, EyeOff } from "lucide-react";

export default function SignUpForm({ onSwitchToSignIn }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    if (name === "phoneNumber") setPhoneNumber(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setPasswordMatch(value === password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full max-w-md -mt-8">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 transition"
              minLength="6"
              maxLength="8"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1  transition ${
                passwordMatch ? "border-green-500" : "border-red-500"
              }`}
              minLength="6"
              maxLength="8"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {passwordMatch && confirmPassword && (
            <div className="text-green-500 mt-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" /> Passwords match
            </div>
          )}
          {!passwordMatch && confirmPassword && (
            <div className="text-red-500 mt-2">Passwords do not match</div>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 w-full py-2 px-4 rounded-lg font-medium text-white transition"
        >
          Sign Up
        </button>

        <p
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignIn();
          }}
          className="text-center block cursor-pointer mt-6"
        >
          Already have an account?{" "}
          <span className="text-green-600 font-bold hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
