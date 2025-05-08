import React from "react";
import Image from "next/image";
import { Search, Upload } from "lucide-react";
const Book = () => {
  return (
    <div className="shadow w-[48%] rounded-md overflow-hidden shrink-0 mb-5">
      <div className="w-full h-32 overflow-hidden">
        <Image src="/book.jpg" alt="A book cover" height={500} width={500} />
      </div>

      <div className="flex justify-between p-4">
        <div>
          <div className="font-semibold">48 Laws of Power</div>
          <div className="text-sm ">Published by: Seyi Benjamin</div>
        </div>

        <div className="w-20 flex items-center justify-center bg-accent text-sm rounded-full h-8 font-semibold">
          #10,000
        </div>
      </div>
    </div>
  );
};
const Books = () => {
  return (
    <div className="px-10 w-full flex justify-between">
      <div className="w-[55%] flex items-center justify-between flex-wrap">
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
      <div className="w-[40%]">
        <div className="fixed top-28 right-10 w-[calc(40%-7.7rem)] h-12">
          {/* Search Bar */}
          <div className="h-12 w-full bg-gray-100 rounded-md flex items-center mb-5">
            <div className="flex items-center justify-center w-12">
              <Search size={20} strokeWidth={1.5} className="text-neutral" />
            </div>
            <input
              type="text"
              className="grow bg-transparent outline-none text-neutral-600 text-sm"
              placeholder="Search for a book"
            />
          </div>

          {/* Stats */}
          <div className="mb-5">
            <div className=" flex items-center w-full h-14 px-5 bg-accent-light  border-2 border-accent rounded-md mb-2">
              <div className="text-accent flex items-center">
                Books Published:{" "}
                <div className="text-accent-dark ml-2">435</div>
              </div>
            </div>

            <div className=" flex items-center w-full h-14 px-5 bg-accent-light  border-2 border-accent rounded-md">
              <div className="text-accent flex items-center">
                Books Sold: <div className="text-accent-dark ml-2">34</div>
              </div>
            </div>
          </div>

          {/* Upload  */}
          <div className="w-full flex items-center gap-5 cursor-pointer mb-5">
            <div className="h-16 w-16 bg-accent-light text-accent rounded-full flex items-center justify-center">
              <Upload size={20} strokeWidth={2} />
            </div>

            <div>Upload New Book</div>
          </div>

          {/* Book Request */}
          <div className="w-full min-h-[14rem] shadow  rounded-md overflow-hidden mb-20">
            {/* Heading */}
            <div className="flex items-center justify-between bg-accent h-14 px-5">
              <div className="font-semibold text-accent-dark">
                New Book Requests
              </div>
              <div className="h-5 flex items-center justify-center px-3 rounded-md text-sm bg-neutral-50">
                32
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Activity */}
              <div className="flex items-center gap-2 mb-5">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <div className="text-sm text-gray-600">Teach me to pray</div>
              </div>

              {/* Activity */}
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <div className="text-sm text-gray-600">Notes from PM</div>
              </div>
            </div>

            {/* Button */}
            <button className="h-8 px-5 mx-5 bg-accent flex items-center gap-2 mb-5 rounded-md">
              <span>View All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Books;
