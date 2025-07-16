import { CheckSquare, Cloud, LeafIcon, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";

export default function LeftNavBar({ selectedOption, setSelectedOption }) {
  const menuItems = [
    { label: "Weather Forcast", icon: Cloud, value: "weather" },
    { label: "MyPicks", icon: Heart, value: "personal" },
    { label: "Crop Match", icon: CheckSquare, value: "crop" },
    { label: "Seed Quality", icon: ShieldCheck, value: "seed" },
    { label: "Plant Monitor", icon: LeafIcon, value: "plant" },
  ];

  return (
    <nav className="bg-gray-100 text-gray-800 w-64 min-h-screen p-4 rounded-md shadow-2xl">
      <Link
        className="font-bold text-2xl text-gray-900 mb-4 block"
        href="/options"
      >
        {"Mlimi App"}
      </Link>
      <hr className="mb-4" />

      <ul className="text-lg space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.value}
            className={`flex items-center cursor-pointer px-3 py-2.5 hover:text-green-700  rounded-lg ${
              selectedOption === item.value
                ? "text-green-700 font-medium bg-green-100 rounded-lg border-r-4 border-green-700"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption(item.value)}
          >
            <item.icon className="mr-2 w-5" />
            {item.label}
            {selectedOption === item.value}
          </li>
        ))}
      </ul>
    </nav>
  );
}
