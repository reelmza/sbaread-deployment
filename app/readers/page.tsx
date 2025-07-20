"use client";
import PageError from "@/components/PageError";
import PageLoading from "@/components/PageLoading";
import { attachHeaders, localAxios } from "@/lib/axios";
import { AxiosError } from "axios";
import { Search } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Readers = () => {
  const { data: session } = useSession();
  const controller = new AbortController();

  const [pageData, setPageData] = useState<
    { id: String; name: String; email: String; phone: String }[] | null
  >(null);
  const [loading, setLoading] = useState<string | null>("page");

  useEffect(() => {
    if (!session) return;
    const getData = async () => {
      try {
        attachHeaders(session!.user.token);
        const res = await localAxios.get(
          "/user/all?account_type=reader&per_page=20",
          {
            signal: controller.signal,
          }
        );

        if (res.data) {
          console.log(res.data.data.data);
          setPageData(res.data.data.data);
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
      {loading !== "page" && pageData !== null ? (
        <div className="px-10">
          {/* Stats and Search Bar */}
          <div className="flex items-center justify-between mb-10">
            {/* <div>
          <div className="text-accent-dark font-semibold flex items-center">
            No. of Readers: <div className="text-accent ml-2">50</div>
          </div>
          <div className="text-accent-dark font-semibold flex items-center">
            No. of Active Subscribers:
            <div className="text-accent ml-2">230</div>
          </div>
        </div> */}

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
              <div className="col-span-2">Membership</div>

              {/* Action */}
              <div className="col-span-1">Action</div>
            </div>

            {/* Table Content */}
            {pageData.map((item, key) => {
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
                  <div className="col-span-2">{item.name}</div>

                  {/* Email Address */}
                  <div className="col-span-3">{item.email}</div>

                  {/* Phone Number */}
                  <div className="col-span-3">{item.phone || "No phone"}</div>

                  {/* Membership */}
                  <div className="col-span-2">reader</div>

                  {/* Action */}
                  <div className="col-span-1">
                    <Link
                      href={`/readers/${item.id}`}
                      className="text-gray-600"
                    >
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

const ReadersWrapper = () => {
  return (
    <SessionProvider>
      <Readers />
    </SessionProvider>
  );
};

export default ReadersWrapper;
