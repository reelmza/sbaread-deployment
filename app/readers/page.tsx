import { Search } from "lucide-react";
import React from "react";

const Readers = () => {
  return (
    <div className="px-10">
      {/* Stats and Search Bar */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-accent-dark font-semibold flex items-center">
            No. of Readers: <div className="text-accent ml-2">50</div>
          </div>
          <div className="text-accent-dark font-semibold flex items-center">
            No. of Active Subscribers:
            <div className="text-accent ml-2">230</div>
          </div>
        </div>

        <div className="h-12 w-72 bg-gray-100 rounded-md flex items-center">
          <div className="flex items-center justify-center w-12">
            <Search size={20} strokeWidth={1.5} className="text-neutral" />
          </div>
          <input
            type="text"
            className="grow bg-transparent outline-none text-neutral-600 text-sm"
            placeholder="Search for a reader"
          />
        </div>
      </div>
    </div>
  );
};

export default Readers;
