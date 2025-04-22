// components/DashboardCard.tsx
import React from "react";
import { FaUsers, FaUserTie, FaBook, FaClipboardList, FaChevronRight } from "react-icons/fa"; // Icons for stats

const DashboardCard = () => {
  return (
    <div className="p-6 rounded-lg grid grid-cols-[2fr_1fr] gap-12">
      {/* Left Section: Welcome Message, Task Description, and Progress Bar */}
      <div className="bg-[#D8B99C] p-4 rounded-lg shadow-md space-y-4">
        {/* Welcome Section */}
        <div>
          <h2 className="text-xl font-semibold text-white">Welcome Back, Theo</h2>
          <p className="text-sm text-white">Pick right back up from your previous task</p>
        </div>

        {/* Task Description and Progress Bar */}
        <div className="space-y-3">
          <div className="bg-[#FFF5E1] py-5 text-sm font-medium text-[#4E342E]">
            New Book Verification Process
            {/* Clickable icon */}
            <FaChevronRight className="inline-block ml-2 text-white cursor-pointer" />
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white">
                80%
              </span>
            </div>
            <div className="relative flex mb-2 items-center justify-between w-full">
              <div className="flex-auto border-2 rounded-full h-2 bg-[#E0D3B8]">
                <div
                  className="rounded-full h-2 bg-[#9B6B3C]"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Stats Cards */}
      <div className="flex flex-col gap-4 mt-4">
        {/* Card for Readers */}
        <div className="px-4 flex items-center space-x-4">
          <div className="flex justify-center items-center bg-[#D8C6A1] w-14 h-14 rounded-full">
            <FaUsers className="text-2xl text-[#9B6B3C]" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#9B6B3C]">700</div>
            <div className="text-sm text-[#9B6B3C]">No. of Readers</div>
          </div>
        </div>

        {/* Card for Authors */}
        <div className="px-4 flex items-center space-x-4">
          <div className="flex justify-center items-center bg-[#D8C6A1] w-14 h-14 rounded-full">
            <FaUserTie className="text-2xl text-[#9B6B3C]" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#9B6B3C]">120</div>
            <div className="text-sm text-[#9B6B3C]">No. of Authors</div>
          </div>
        </div>

        {/* Card for Published Books */}
        <div className=" px-4 flex items-center space-x-4">
          <div className="flex justify-center items-center bg-[#D8C6A1] w-14 h-14 rounded-full">
            <FaBook className="text-2xl text-[#9B6B3C]" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#9B6B3C]">205</div>
            <div className="text-sm text-[#9B6B3C]">No. of Published Books</div>
          </div>
        </div>

        {/* Card for Active Subscriptions */}
        <div className="px-4  flex items-center space-x-4">
          <div className="flex justify-center items-center bg-[#D8C6A1] w-14 h-14 rounded-full">
            <FaClipboardList className="text-2xl text-[#9B6B3C]" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#9B6B3C]">90</div>
            <div className="text-sm text-[#9B6B3C]">No. of Active Subscriptions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
