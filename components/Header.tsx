"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Header = () => {
  const [profileState, setProfileState] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const nav = [
    { name: "Home", link: "/dashboard" },
    { name: "Readers", link: "/readers" },
    { name: "Authors", link: "/authors" },
    { name: "Books", link: "/books" },
    { name: "Payments", link: "/payments" },
  ];
  return (
    <>
      {path !== "/" &&
      path !== "/set-password" &&
      path !== "/reset-password" ? (
        <>
          <div className="fixed w-full lg:w-[calc(100%-16.6667%)] h-20 flex items-center lg:justify-between border-b border-gray-100 bg-white  z-20 py-5 px-5 lg:py-10 lg:px-10">
            {/* Mobile menu button */}
            <button
              className="flex lg:hidden items-center justify-center pr-2"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <Menu size={20} />
            </button>

            {/* Page Name */}
            <div className="">
              {path.split("/")[1].slice(0, 1).toLocaleUpperCase() +
                path.split("/")[1].slice(1, path.length)}
            </div>

            {/* Mobile Menu  */}
            <div
              className={` lg:hidden absolute top-20 h-[100vh] w-[70%] bg-white px-5 pt-5 border-t border-gray-100 transition-all ease-in-out ${
                showMenu ? "left-0" : "-left-[70vw]"
              }`}
            >
              {nav.map((item, key) => {
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setShowMenu(false);
                      router.push(item.link);
                    }}
                    className="flex"
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Desktop content */}
            <div className="hidden lg:flex items-center justify-center text-gray-600">
              {/* Notification */}
              <div className="relative flex items-center justify-center h-fit w-fit shrink-0">
                <Bell size={22} strokeWidth={2.5} className="mr-4" />
                <div className="h-2 w-2 bg-red-600 rounded-full absolute top-0 right-4.5"></div>
              </div>

              <div className="relative flex items-center">
                <button
                  className="flex items-center justify-center cursor-pointer bgs-red-400"
                  onClick={() => setProfileState((prev) => !prev)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-8 text-neutral-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <ChevronDown size={20} strokeWidth={1.5} className="mr-10" />
                </button>

                <div
                  className={`w-48 absolute -bottom-24 right-10 p-2 border bg-white rounded-md shadow text-sm ${
                    profileState ? "opacity-100" : "opacity-0 hidden"
                  } transition-all ease-in-out duration-500`}
                >
                  <Link href="/profile">
                    <div className="w-full h-8 hover:bg-neutral-100 cursor-pointer rounded-md flex items-center px-2">
                      Profile
                    </div>
                  </Link>

                  <button
                    className="w-full h-8 hover:bg-neutral-100 cursor-pointer rounded-md flex items-center px-2 text-red-600"
                    onClick={() => signOut({ redirectTo: "/" })}
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Inivte Admin */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-accent text-sm text-white rounded h-8 px-5 hidden lg:block">
                    Invite Admin
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Admin</DialogTitle>
                  </DialogHeader>

                  <form className="flex items-center justify-between gap-4">
                    <div className="h-10 grow bg-gray-100 rounded-md flex items-center">
                      <div className="flex items-center justify-center w-12">
                        <Search
                          size={20}
                          strokeWidth={1.5}
                          className="text-neutral"
                        />
                      </div>
                      <input
                        type="text"
                        className="grow bg-transparent outline-none text-neutral-600 text-sm"
                        placeholder="Search for a reader"
                      />
                    </div>

                    <button className="h-10 w-32 bg-emerald-600 rounded flex items-center justify-center text-sm text-white font-semibold cursor-pointer">
                      Invite
                    </button>
                  </form>
                </DialogContent>
              </Dialog>
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
