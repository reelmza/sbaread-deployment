// pages/dashboard.tsx
import { BookOpen, Send, Wallet } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex justify-between w-full px-10">
      <div className="w-7/12 bg-accent-light text-white p-8 rounded-md">
        {/* Welcome Text */}
        <div className="mb-10">
          <div className="text-3xl font-semibold">Welcome Back, Theo</div>
          <p className="text-accent-tint text-lg">
            Pick right back up from your previous task
          </p>
        </div>

        {/* Task */}
        <div className="w-full">
          <div className="w-full h-16 bg-accent-tint flex items-center justify-between px-5 rounded-md mb-4">
            <span className="text-accent-dark font-semibold">
              New Book Verification Process
            </span>

            <div className="h-8 w-8 flex items-center justify-center bg-accent rounded-full text-accent-dark">
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
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-[80%] h-2 bg-accent-tint rounded"></div>
            <span className="ml-2 text-sm">80%</span>
          </div>
        </div>
      </div>
      <div className="w-4/12">
        {/* No Readerds */}
        <div className="w-full flex items-center gap-4 mb-5">
          <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
            <BookOpen size={16} strokeWidth={2} />
          </div>
          <div className="grow">
            <div className="font-semibold">700</div>
            <p className="text-sm text-accent">No. of readers</p>
          </div>
        </div>

        {/* No Authors */}
        <div className="w-full flex items-center gap-4 mb-5">
          <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          </div>
          <div className="grow">
            <div className="font-semibold">120</div>
            <p className="text-sm text-accent">No. of authors</p>
          </div>
        </div>

        {/* No Published */}
        <div className="w-full flex items-center gap-4 mb-5">
          <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
            <Send size={20} strokeWidth={1.5} />
          </div>
          <div className="grow">
            <div className="font-semibold">205</div>
            <p className="text-sm text-accent">No. of published books</p>
          </div>
        </div>

        {/* No active subs */}
        <div className="w-full flex items-center gap-4">
          <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
            <Wallet size={20} strokeWidth={1.5} />
          </div>
          <div className="grow">
            <div className="font-semibold">123</div>
            <p className="text-sm text-accent">No. of active subscriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
