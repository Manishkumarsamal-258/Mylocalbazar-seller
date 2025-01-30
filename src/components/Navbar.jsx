import React from "react";
import { User } from "lucide-react"; // Import the User icon
import { useNavigate } from "react-router-dom"; // For navigation

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white shadow-md">
      <h1 className="text-xl font-bold text-gray-800 flex flex-col items-center">
        <span className="flex items-center space-x-1">
          <span>MY LOCAL BAZZAR</span>
          <span className="text-pink-400">.</span>
        </span>
        <span className="text-pink-400 text-lg font-medium">SELLER PANEL</span>
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/profile")} // Redirect to the profile page
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
