"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();
  return (
    <>
      {path !== "/" &&
      path !== "/set-password" &&
      path !== "/reset-password" ? (
        <>
          <div className="fixed hidden lg:flex flex-col left-0 top-0 shrink-0 h-full w-2/12 bg-[#fff1e6]">
            {/* Logo */}
            <div className="flex items-center justify-center h-32">
              <Image
                src={"/logo-white.png"}
                alt="SBA Reads Logo"
                height={50}
                width={50}
              />
            </div>

            {/* Home */}
            <Link href={"/dashboard"}>
              <div
                className={`w-full h-12 flex items-center ${
                  path === "/dashboard"
                    ? "bg-white text-accent font-semibold"
                    : ""
                } text-sm px-10 gap-2 mb-2 cursor pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>

                <span>Home</span>
              </div>
            </Link>

            {/* Readers */}
            <Link href={"/readers"}>
              <div
                className={`w-full h-12 flex items-center ${
                  path.includes("/readers")
                    ? "bg-white text-accent font-semibold"
                    : ""
                } text-sm px-10 gap-2 mb-2 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>

                <span>Readers</span>
              </div>
            </Link>

            {/* Authors */}
            <Link href={"/authors"}>
              <div
                className={`w-full h-12 flex items-center ${
                  path.includes("/authors")
                    ? "bg-white text-accent font-semibold"
                    : ""
                } text-sm  px-10 gap-2 mb-2 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span>Authors</span>
              </div>
            </Link>

            {/* Books */}
            <Link href={"/books"}>
              <div
                className={`w-full h-12 flex items-center ${
                  path.includes("/books")
                    ? "bg-white text-accent font-semibold"
                    : ""
                } text-sm  px-10 gap-2 mb-2 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                  />
                </svg>

                <span>Books</span>
              </div>
            </Link>

            {/* Payment */}
            <Link href={"/payments"}>
              <div
                className={`w-full h-12 flex items-center ${
                  path.includes("/payments")
                    ? "bg-white text-accent font-semibold "
                    : ""
                } text-sm  px-10 gap-2 mb-2 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span>Transactions</span>
              </div>
            </Link>

            {/* Analytics */}
            <Link href={"/orders"}>
              <div
                className={`w-full h-12 flex items-center ${
                  path === "/orders" ? "bg-white text-accent font-semibold" : ""
                } text-sm  px-10 gap-2 mb-2 cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>

                <span>Orders</span>
              </div>
            </Link>
          </div>
          <div className="hidden lg:block shrink-0 w-2/12 h-full bg-green-100"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
