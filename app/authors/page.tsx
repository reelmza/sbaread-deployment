"use client";

import { Eye, Search, UserRoundX } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Spinner from "@/components/Spinner";
import PageLoading from "@/components/PageLoading";
import PageError from "@/components/PageError";
import ThemeSpacer from "@/components/ThemeSpacer";
const Page = () => {
  const [loading, setLoading] = useState<string | null>("page");
  const [pageData, setPageData] = useState<{
    applications: {}[];
    tableData: {}[];
  } | null>(null);

  const applications = [
    {
      id: 7,
      name: "Grace Nwosu",
      email: "grace.nwosu@example.com",
      documents: {
        idCard: "https://example.com/docs/id/grace-nwosu-id.png",
        address: "https://example.com/docs/address/grace-nwosu-address.png",
      },
      emailVerfiied: true,
      address: "1019 Gimbiya, Area 1, Garki",
    },
    {
      id: 3,
      name: "Samuel Adigun",
      email: "samuel.adigun@example.com",
      documents: {
        idCard: "https://example.com/docs/id/samuel-adigun-id.png",
        address: "https://example.com/docs/address/samuel-adigun-address.png",
      },
      emailVerfiied: false,
      address: "10 Cadastral Zone, Utako",
    },
    {
      id: 12,
      name: "Aisha Bello",
      email: "aisha.bello@example.com",
      documents: {
        idCard: "https://example.com/docs/id/aisha-bello-id.png",
        address: "https://example.com/docs/address/aisha-bello-address.png",
      },
      emailVerfiied: false,
      address: "4 Elias St, Wuye",
    },
    {
      id: 18,
      name: "Chinedu Okafor",
      email: "chinedu.okafor@example.com",
      documents: {
        idCard: "https://example.com/docs/id/chinedu-okafor-id.png",
        address: "https://example.com/docs/address/chinedu-okafor-address.png",
      },
      emailVerfiied: false,
      address: "23 NAF Valley, Asokoro",
    },
    {
      id: 5,
      name: "Lilian Eze",
      email: "lilian.eze@example.com",
      documents: {
        idCard: "https://example.com/docs/id/lilian-eze-id.png",
        address: "https://example.com/docs/address/lilian-eze-address.png",
      },
      emailVerfiied: true,
      address: "2 Sankara St, Wuse 2",
    },
  ];

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

  const changeAuthorStatus = async (id: number, action: string) => {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(null);
      setPageData({
        applications,
        tableData,
      });
    }, 2000);
  }, []);

  return (
    <>
      {loading !== "page" && pageData !== null ? (
        <div className="px-10">
          {/* Stats and Search Bar */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-accent-dark font-semibold flex items-center">
                No. of Authors: <div className="text-accent ml-2">50</div>
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

          {/* Author Application */}
          <div>
            <div className="text-accent-dark font-semibold mb-5">
              New Authors Applications
            </div>

            <div className="w-full relative overflow-x-scroll flex items-center mb-10 gap-10 pb-2">
              {applications.map((item) => {
                return (
                  <div
                    className="h-fit shadow-md shrink-0 w-2/8 flex flex-col items-center py-5 rounded-lg"
                    key={applications.indexOf(item)}
                  >
                    <Image
                      src="/woman.jpg"
                      alt="An african woman"
                      width={80}
                      height={80}
                      className="rounded-full mb-5"
                    />
                    <Dialog>
                      <DialogTrigger className="mb-5 cursor-pointer outline-none">
                        {item.name}
                      </DialogTrigger>
                      <DialogContent className="pt-10">
                        <VisuallyHidden>
                          <DialogTitle>Author Application</DialogTitle>
                        </VisuallyHidden>

                        {/* Heading */}
                        <div className="w-full flex items-center justify-between">
                          <div className="flex gap-4 items-center">
                            <Image
                              src={"/woman.jpg"}
                              alt="African Woman"
                              width={48}
                              height={48}
                              className="rounded-full"
                            />

                            <div className="text-lg font-semibold">
                              {item.name}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              className={`h-8 w-28 bg-emerald-600 rounded-md text-white text-sm cursor-pointer flex items-center justify-center gap-2 ${
                                loading === "approveAuthor"
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                              onClick={() =>
                                changeAuthorStatus(item!.id, "approve")
                              }
                              disabled={loading !== null}
                            >
                              <span>Approve</span>
                              {loading === "approveBook" ? (
                                <Spinner className="size-4" />
                              ) : (
                                ""
                              )}
                            </button>
                            <button
                              className={`h-8 w-28 bg-red-600 rounded-md text-white text-sm cursor-pointer flex items-center justify-center gap-2 ${
                                loading === "declineAuthor"
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                              onClick={() =>
                                changeAuthorStatus(item!.id, "decline")
                              }
                              disabled={loading !== null}
                            >
                              <span>Decline</span>
                              {loading === "declinrAuthor" ? (
                                <Spinner className="size-4" />
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        </div>

                        <ThemeSpacer size="unit" />

                        {/* Personal Data */}
                        <div className="flex items-center flex-wrap gap-y-2">
                          {/* Name */}
                          <div className="w-[48%] text-sm">
                            <div className="font-semibold">Full Name</div>
                            <div>{item.name}</div>
                          </div>

                          {/* Email */}
                          <div className="w-[48%] text-sm">
                            <div className="font-semibold">Email</div>
                            <div>{item.email}</div>
                          </div>

                          {/* Address */}
                          <div className="w-[48%] text-sm">
                            <div className="font-semibold">Address</div>
                            <div>{item.address}</div>
                          </div>

                          {/* Emil Verify Status */}
                          <div className="w-[48%] text-sm">
                            <div className="font-semibold">Email Verified</div>
                            <div>{item.emailVerfiied ? "Yes" : "No"}</div>
                          </div>
                        </div>

                        {/* Line */}
                        <div className="flex items-center justify-center w-full text-sm gap-4 my-2">
                          <span className="font-semibold">Documents</span>
                          <div className="w-full h-[1px] mt-[1px] bg-gray-200"></div>
                        </div>

                        {/* Documents */}
                        <div className="flex items-center flex-wrap gap-y-2 gap-x-5">
                          {/* idCard */}
                          <div className="w-fit h-5 flex items-center  text-xs rounded-full px-2 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                            {item.documents.idCard.slice(0, 23) + "..."}
                          </div>

                          {/* idCard */}
                          <div className="w-fit h-5 flex items-center  text-xs rounded-full px-2 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                            {item.documents.address.slice(0, 23) + "..."}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div className="w-full">
            {/* Table Heading */}
            <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white">
              {/* Serial */}
              <div className="col-span-1">S/N</div>

              {/* Pen Name */}
              <div className="col-span-3">Pen Name</div>

              {/* Email Address */}
              <div className="col-span-3">Email Address</div>

              {/* Phone Number */}
              <div className="col-span-3">Phone Number</div>

              {/* Action */}
              <div className="col-span-2">Action</div>
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
                  <div className="col-span-1">
                    {tableData.indexOf(item) + 1}
                  </div>

                  {/* Username */}
                  <div className="col-span-3">{item.username}</div>

                  {/* Email Address */}
                  <div className="col-span-3">{item.email}</div>

                  {/* Phone Number */}
                  <div className="col-span-3">{item.phone}</div>

                  {/* Action */}
                  <div className="col-span-2 flex items-center gap-2">
                    <Link href={`/authors/${tableData.indexOf(item)}`}>
                      <Eye size={20} strokeWidth={2} />
                    </Link>
                    <UserRoundX size={20} strokeWidth={2} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}

      {loading === "page" ? <PageLoading /> : ""}
      {loading === "error" ? <PageError /> : ""}
    </>
  );
};

export default Page;
