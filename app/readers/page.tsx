import { Search } from "lucide-react";
import React from "react";

const Readers = () => {
  const tableData = [
    {
      username: "reelMza342",
      email: "jessemoses@yahoo.com",
      phone: "0905533222",
      membership: "basic",
    },
    {
      username: "techieJen01",
      email: "jen.techie@gmail.com",
      phone: "0812345678",
      membership: "premium",
    },
    {
      username: "alphaZed93",
      email: "alpha93@protonmail.com",
      phone: "0709876543",
      membership: "basic",
    },
    {
      username: "novaSpark88",
      email: "nova88@hotmail.com",
      phone: "0801122334",
      membership: "gold",
    },
    {
      username: "cyberLion77",
      email: "lion_77@outlook.com",
      phone: "0812233445",
      membership: "basic",
    },
    {
      username: "greenLeaf21",
      email: "leafy21@gmail.com",
      phone: "0903344556",
      membership: "premium",
    },
    {
      username: "zenithRex45",
      email: "rex.zenith45@yahoo.com",
      phone: "0704455667",
      membership: "gold",
    },
    {
      username: "echoBeta09",
      email: "beta09@live.com",
      phone: "0805566778",
      membership: "basic",
    },
    {
      username: "urbanFlare66",
      email: "urban66@ymail.com",
      phone: "0816677889",
      membership: "premium",
    },
    {
      username: "codeVibe55",
      email: "code.vibe55@gmail.com",
      phone: "0907788990",
      membership: "basic",
    },
    {
      username: "astroWave19",
      email: "astro19@icloud.com",
      phone: "0708899001",
      membership: "gold",
    },
  ];

  return (
    <div className="px-10">
      {/* Stats and Search Bar */}
      <div className="flex items-center justify-between mb-10">
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

      {/* Table */}
      <div className="w-full">
        {/* Table Heading */}
        <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white">
          {/* Serial */}
          <div className="col-span-1">S/N</div>

          {/* Username */}
          <div className="col-span-2">Username</div>

          {/* Email Address */}
          <div className="col-span-3">Email Address</div>

          {/* Phone Number */}
          <div className="col-span-3">Phone Number</div>

          {/* Membership */}
          <div className="col-span-3">Membership</div>
        </div>

        {/* Table Content */}
        {tableData.map((item) => {
          return (
            <div
              className={`grid grid-cols-12 h-12 items-center px-5 text-gray-600 text-sm ${
                tableData.indexOf(item) % 2 === 0 ? "bg-gray-50" : ""
              }`}
              key={tableData.indexOf(item)}
            >
              {/* Serial */}
              <div className="col-span-1">{tableData.indexOf(item) + 1}</div>

              {/* Username */}
              <div className="col-span-2">{item.username}</div>

              {/* Email Address */}
              <div className="col-span-3">{item.email}</div>

              {/* Phone Number */}
              <div className="col-span-3">{item.phone}</div>

              {/* Membership */}
              <div className="col-span-3">{item.membership}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Readers;
