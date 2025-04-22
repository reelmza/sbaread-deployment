// components/Topbar.tsx
import React from "react";
import { FaBell, FaCaretDown } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold text-[#9B6B3C]">Account Overview</div>
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 text-[#9B6B3C]">
          <FaBell />
          <span className="text-sm">Notifications</span>
        </button>
        <button className="flex items-center space-x-2 text-[#9B6B3C]">
          <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full w-10 h-10" />
          <FaCaretDown />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
