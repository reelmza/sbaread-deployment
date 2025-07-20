"use client";

import { ChevronDownIcon, Eye, Search, UserRoundX } from "lucide-react";
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
import { attachHeaders, localAxios } from "@/lib/axios";
import { SessionProvider, useSession } from "next-auth/react";
import { sign } from "crypto";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AxiosError } from "axios";

type Application = {
  id: string;
  name: string;
  email: string;
  address: string;
  email_verified_at: string;
  status: string;
  kyc_info: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    phone: string;
    gender: string;
    city: string;
    state: string;
    conuntry: string;
    dob: string;
  };
};

const Page = () => {
  const { data: session } = useSession();
  const controller = new AbortController();

  const [loading, setLoading] = useState<string | null>("page");
  const [applications, setApplications] = useState<Application[] | null>(null);

  const changeAuthorStatus = async (id: string, action: string) => {
    setLoading("changeAuthorStatus");

    try {
      attachHeaders(session!.user.token);
      const res = await localAxios.post(`user/profile/action/${action}/${id}`, {
        signal: controller.signal,
      });

      if (res.data) {
        console.log(res);

        let newData = applications;
        newData!.find((author) => author.id === id)!.status = action;
        setApplications(newData);

        setLoading(null);
        toast.success(`Author set to ${action} successfully.`, {
          richColors: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured", {
        richColors: true,
        position: "bottom-left",
      });
      setLoading(null);
    }
  };

  useEffect(() => {
    if (!session) return;
    const getData = async () => {
      try {
        attachHeaders(session!.user.token);
        const res = await localAxios.get(
          "/user/all?account_type=author&per_page=70",
          {
            signal: controller.signal,
          }
        );

        if (res.data) {
          // console.log(res);
          console.log(res);
          setApplications(res.data.data.data);
          setLoading(null);
        }
      } catch (error) {
        console.log(error);
        if ((error as AxiosError).message !== "canceled") {
          setLoading("error");
        }
      }
    };

    getData();

    return () => {
      controller.abort();
    };
  }, [session]);

  return (
    <>
      {loading !== "page" && applications !== null ? (
        <div className="px-10">
          {/* Stats and Search Bar */}
          <div className="flex items-center justify-between mb-10">
            <div>
              {/* <div className="text-accent-dark font-semibold flex items-center">
                No. of Authors: <div className="text-accent ml-2">50</div>
              </div> */}
            </div>

            <div className="h-12 w-72 bg-gray-100 rounded-md flex items-center">
              <div className="flex items-center justify-center w-12">
                <Search size={20} strokeWidth={1.5} className="text-neutral" />
              </div>
              <input
                type="text"
                className="grow bg-transparent outline-none text-neutral-600 text-sm"
                placeholder="Search for an author"
              />
            </div>
          </div>

          {/* Author Application */}
          <div>
            <div className="text-accent-dark font-semibold mb-5">
              New Authors Applications
            </div>

            <div className="w-full relative overflow-x-scroll flex items-center mb-10 gap-10 pb-2">
              {applications.map((item, key) => {
                return (
                  <div
                    className="h-fit shadow-md shrink-0 w-2/8 flex flex-col items-center py-5 rounded-lg"
                    key={key}
                  >
                    <Image
                      src="/user.png"
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
                              src={"/user.png"}
                              alt="African Woman"
                              width={48}
                              height={48}
                              className="rounded-full"
                            />

                            <div className="">
                              <div className="text-lg font-semibold">
                                {item.name}
                              </div>

                              <div className="text-sm">
                                {item.status.slice(0, 1).toUpperCase() +
                                  item.status.slice(1, item.status.length)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  className={`outline-none cursor-pointer h-10 border w-38 rounded-md text-sm text-gray-800 flex items-center justify-center gap-2
                          ${
                            loading === "changeBookStatus"
                              ? "opacity-75 pointer-events-none"
                              : ""
                          }`}
                                  disabled={loading === "changeBookStatus"}
                                >
                                  <span>Manage User</span>
                                  {loading === "changeAuthorStatus" ? (
                                    <Spinner className="size-4 " />
                                  ) : (
                                    <ChevronDownIcon size={16} />
                                  )}
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-38 mt-1">
                                <DropdownMenuRadioGroup
                                  value={item?.status}
                                  onValueChange={(val) => {
                                    changeAuthorStatus(item!.id, val);
                                  }}
                                >
                                  <DropdownMenuRadioItem
                                    value="active"
                                    className="hover:text-emerald-600 cursor-pointer"
                                  >
                                    Active
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem
                                    value="verified"
                                    className="hover:text-emerald-600 cursor-pointer"
                                  >
                                    Verified
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem
                                    value="pending"
                                    className="hover:text-orange-600 cursor-pointer"
                                  >
                                    Pending
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem
                                    value="suspended"
                                    className={`hover:text-red-600 cursor-pointer ${
                                      item?.status !== "declined"
                                        ? "opacity-75 pointer-events-none"
                                        : ""
                                    }`}
                                  >
                                    Suspended
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem
                                    value="banned"
                                    className={`hover:text-red-600 cursor-pointer ${
                                      item?.status !== "declined"
                                        ? "opacity-75 pointer-events-none"
                                        : ""
                                    }`}
                                  >
                                    Banned
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem
                                    value="rejected"
                                    className={`hover:text-red-600 cursor-pointer ${
                                      item?.status !== "declined"
                                        ? "opacity-75 pointer-events-none"
                                        : ""
                                    }`}
                                  >
                                    Rejected
                                  </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <button
                              className={`h-8 w-28 bg-emerald-600 rounded-md text-white text-sm cursor-pointer flex items-center justify-center gap-2 ${
                                loading === "approveAuthor"
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                              onClick={() =>
                                changeAuthorStatus(item!.id, "verified")
                              }
                              disabled={loading !== null}
                            >
                              <span>Approve</span>
                              {loading === "approveAuthor" ? (
                                <Spinner className="size-4" />
                              ) : (
                                ""
                              )}
                            </button>
                            <button
                              className={`h-8 w-28 bg-orange-600 rounded-md text-white text-sm cursor-pointer flex items-center justify-center gap-2 ${
                                loading === "declineAuthor"
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                              onClick={() =>
                                changeAuthorStatus(item!.id, "pending")
                              }
                              disabled={loading !== null}
                            >
                              <span>Revert</span>
                              {loading === "declineAuthor" ? (
                                <Spinner className="size-4" />
                              ) : (
                                ""
                              )}
                            </button> */}
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
                            <div>{item.address || "No address"}</div>
                          </div>

                          {/* Emil Verify Status */}
                          <div className="w-[48%] text-sm">
                            <div className="font-semibold">Email Verified</div>
                            <div>{item.email_verified_at ? "Yes" : "No"}</div>
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
                            {/* {item.documents.idCard.slice(0, 23) + "..."} */}
                            https://res.cloudinary.com/so...
                          </div>

                          {/* idCard */}
                          <div className="w-fit h-5 flex items-center  text-xs rounded-full px-2 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                            {/* {item.documents.address.slice(0, 23) + "..."} */}
                            https://res.cloudinary.com/so...
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
            <div className="text-accent-dark font-semibold mb-5">
              Verified Authors
            </div>
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
            {applications
              .filter((entry) => entry.kyc_info !== null)
              .map((item, key) => {
                return (
                  <div
                    className={`grid grid-cols-12 h-12 items-center px-5 text-gray-600 text-sm ${
                      key % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                    key={key}
                  >
                    {/* Serial */}
                    <div className="col-span-1">{key + 1}</div>

                    {/* Username */}
                    <div className="col-span-3">{`${item.kyc_info.first_name} ${item.kyc_info.last_name}`}</div>

                    {/* Email Address */}
                    <div className="col-span-3">{item.email}</div>

                    {/* Phone Number */}
                    <div className="col-span-3">{item.kyc_info.phone}</div>

                    {/* Action */}
                    <div className="col-span-2 flex items-center gap-2">
                      <Link href={`/authors/${item.kyc_info.user_id}`}>
                        Manage
                      </Link>
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

const PageWrapper = () => {
  return (
    <SessionProvider>
      <Page />
    </SessionProvider>
  );
};

export default PageWrapper;
