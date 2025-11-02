"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import PageLoading from "@/components/PageLoading";
import PageError from "@/components/PageError";

import { attachHeaders, localAxios } from "@/lib/axios";
import { SessionProvider, useSession } from "next-auth/react";

import { AxiosError } from "axios";

type Application = {
  id: string;
  total_amount: string;
  tracking_number: string;
  delivery_address: string;
  status: string;
  items: { quantity: string }[];
  created_at: string;
};

const Page = () => {
  const { data: session } = useSession();
  const controller = new AbortController();

  const [loading, setLoading] = useState<string | null>("page");
  const [applications, setApplications] = useState<Application[] | null>(null);

  useEffect(() => {
    if (!session) return;
    const getData = async () => {
      try {
        attachHeaders(session!.user.token);
        const res = await localAxios.get("/order", {
          signal: controller.signal,
        });

        if (res.data) {
          // console.log(res);
          console.log(res);
          setApplications(res.data.data);
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
        <div className="px-10 pb-10">
          {/* Search Bar */}
          <div className="flex items-center justify-between mb-10">
            <div className="h-12 w-72 bg-gray-100 rounded-md flex items-center">
              <div className="flex items-center justify-center w-12">
                <Search size={20} strokeWidth={1.5} className="text-neutral" />
              </div>
              <input
                type="text"
                className="grow bg-transparent outline-none text-neutral-600 text-sm"
                placeholder="Search by tracking number"
              />
            </div>
          </div>

          {/* Table */}
          <div className="w-full">
            <div className="text-accent-dark font-semibold mb-5">
              Recent Orders
            </div>
            {/* Table Heading */}
            <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white text-sm">
              {/* Serial */}
              <div className="col-span-1">S/N</div>

              {/* Tracking Number*/}
              <div className="col-span-3">Tracking Number</div>

              {/*Status */}
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Value</div>
              <div className="col-span-1">Items</div>

              {/* Phone Number */}
              <div className="col-span-1">Destination</div>

              <div className="col-span-3">Date</div>

              {/* Action */}
              <div className="col-span-1">Actions</div>
            </div>
            {/* Table Content */}
            {applications.map((item, key) => {
              return (
                <div
                  className={`grid grid-cols-12 h-12 items-center px-5 text-gray-600 text-sm ${
                    key % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                  key={key}
                >
                  {/* Serial */}
                  <div className="col-span-1">{key + 1}</div>

                  {/* Tracking Number */}
                  <div className="col-span-3">{`${item.tracking_number}`}</div>

                  {/* Payment Status*/}
                  <div className="col-span-1">
                    {item.status.split("")[0].toUpperCase() +
                      item.status.slice(1, item.status.length)}
                  </div>

                  {/* Total Amount */}
                  <div className="col-span-1">
                    ${new Intl.NumberFormat().format(Number(item.total_amount))}
                  </div>

                  {/* Total items */}
                  <div className="col-span-1">{item.items.length} pcs</div>

                  {/* Delivery Address */}
                  <div className="col-span-1">{item.delivery_address}</div>

                  {/* Date */}
                  <div className="col-span-3">
                    {item.created_at.split("T")[0] +
                      " " +
                      item.created_at.split("T")[1].split(".")[0]}
                  </div>

                  {/* Action */}
                  <div className="col-span-1 flex items-center gap-2">
                    <Link href={`/orders/${item.tracking_number}`}>Manage</Link>
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
