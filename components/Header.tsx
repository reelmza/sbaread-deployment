"use client";

import { Bell, ChevronDown, CircleUserRound, User } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  console.log(path);
  return (
    <>
      {path !== "/" &&
      path !== "/set-password" &&
      path !== "/reset-password" ? (
        <>
          <div className="fixed w-[calc(100%-16.6667%)] h-20 flex items-center justify-between border-b border-gray-100 px-10">
            <div className="">Account Overview</div>
            <div className="flex items-center text-gray-600">
              <div className="relative flex items-center justify-center h-fit w-fit shrink-0">
                <Bell size={22} strokeWidth={2.5} className="mr-4" />
                <div className="h-2 w-2 bg-red-600 rounded-full absolute top-0 right-4.5"></div>
              </div>

              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-1">
                <User size={20} strokeWidth={2.5} />
              </div>
              <ChevronDown size={20} strokeWidth={1.5} className="mr-10" />

              <button className="bg-accent text-sm text-white rounded-lg h-8 px-5">
                Invite Admin
              </button>
            </div>
          </div>
          <div className="h-20"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
