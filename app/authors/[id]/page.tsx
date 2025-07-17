import Image from "next/image";
import React from "react";

const Page = async (props: { params: Promise<{ id: number }> }) => {
  const params = await props.params;
  const { id } = params;
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
    <div className="flex flex-col">
      <div className="px-10 flex items-center justify-between mb-5">
        {/* Profile Picture */}
        <div className="grow flex flex-col items-center">
          <Image
            src={"/woman.jpg"}
            alt="African woman potrait"
            width={150}
            height={150}
            className="rounded-full mb-5"
          />

          <div className="text-lg font-semibold text-accent-dark text-center mb-1">
            @{tableData[id].username}
          </div>
          <div className="bg-accent text-sm font-smibold rounded px-2 font-semibold">
            Author #{id}
          </div>
        </div>

        <div className="w-2/3 bg-gray-100 p-10 rounded-lg flex flex-wrap">
          <div className="w-1/2 mb-5">
            <div className="text-gray-600">Phone Number:</div>
            <div>{tableData[id].phone}</div>
          </div>

          <div className="w-1/2 mb-5">
            <div className="text-gray-600">Email Address:</div>
            <div>{tableData[id].email}</div>
          </div>

          <div className="w-1/2 mb-5">
            <div className="text-gray-600">Membership:</div>
            <div>{tableData[id].membership}</div>
          </div>

          <div className="w-1/2 mb-5">
            <div className="text-gray-600">No. of Books Purchased:</div>
            <div>44</div>
          </div>

          <div className="w-1/2 mb-5">
            <div className="text-gray-600">No. of Books Ordered:</div>
            <div>14</div>
          </div>
        </div>
      </div>

      <button className="bg-red-600 h-10 px-5 self-end mr-10 rounded text-white text-sm font-semibold">
        Suspend User
      </button>
    </div>
  );
};
export default Page;
