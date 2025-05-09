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
          <div className="fixed w-[calc(100%-16.6667%)] h-20 flex items-center justify-between border-b border-gray-100 bg-white px-10 z-20 p-10">
            <div className="">Account Overview</div>
            <div className="flex items-center text-gray-600">
              <div className="relative flex items-center justify-center h-fit w-fit shrink-0">
                <Bell size={22} strokeWidth={2.5} className="mr-4" />
                <div className="h-2 w-2 bg-red-600 rounded-full absolute top-0 right-4.5"></div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10 text-neutral-600"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>

              <ChevronDown size={20} strokeWidth={1.5} className="mr-10" />

              <button className="bg-accent text-sm text-white rounded-lg h-8 px-5">
                Invite Admin
              </button>
            </div>
          </div>
          <div className="h-28"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
