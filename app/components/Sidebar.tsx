// components/Sidebar.tsx
import React from "react";
import { FaHome, FaUsers, FaBook, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-[#F9F6F1] w-60 h-screen px-4 py-8 space-y-6 border-r border-[#D8C6A1]">
      {/* Logo or Branding */}
      <div className="text-3xl font-bold text-[#9B6B3C]">
        <FaBook /> {/* You can change this to any other logo/icon */}
      </div>

      {/* Sidebar Navigation */}
      <ul className="space-y-6">
        <li className="flex items-center space-x-3 hover:bg-[#D8C6A1] p-2 rounded-md cursor-pointer">
          <FaHome className="text-xl text-[#9B6B3C]" />
          <span className="text-sm text-[#9B6B3C]">Home</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-[#D8C6A1] p-2 rounded-md cursor-pointer">
          <FaUsers className="text-xl text-[#9B6B3C]" />
          <span className="text-sm text-[#9B6B3C]">Readers</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-[#D8C6A1] p-2 rounded-md cursor-pointer">
          <FaBook className="text-xl text-[#9B6B3C]" />
          <span className="text-sm text-[#9B6B3C]">Books</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-[#D8C6A1] p-2 rounded-md cursor-pointer">
          <FaMoneyBillWave className="text-xl text-[#9B6B3C]" />
          <span className="text-sm text-[#9B6B3C]">Payments</span>
        </li>
        <li className="flex items-center space-x-3 hover:bg-[#D8C6A1] p-2 rounded-md cursor-pointer">
          <FaChartLine className="text-xl text-[#9B6B3C]" />
          <span className="text-sm text-[#9B6B3C]">Analytics</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
