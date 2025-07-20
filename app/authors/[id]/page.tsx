"use client";
import PageError from "@/components/PageError";
import PageLoading from "@/components/PageLoading";
import { attachHeaders, localAxios } from "@/lib/axios";
import { AxiosError } from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import React, { Usable, useEffect, useState } from "react";

const Page = ({ id }: { id: number }) => {
  const { data: session } = useSession();
  const controller = new AbortController();

  const [loading, setLoading] = useState<string | null>("page");
  const [pageData, setPageData] = useState<{
    id: number;
    name: string;
    status: string;
    email: string;
    account_type: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    if (!session) return;
    const getData = async () => {
      try {
        attachHeaders(session!.user.token);
        const res = await localAxios.get(`/user/profile/${id}`, {
          signal: controller.signal,
        });

        if (res.data) {
          console.log(res);
          setPageData(res.data.data);
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
        <div className="flex flex-col">
          <div className="px-10 flex items-center justify-between mb-5">
            {/* Profile Picture */}
            <div className="grow flex flex-col items-center">
              <Image
                src={"/user.png"}
                alt="African woman potrait"
                width={158}
                height={158}
                className="rounded-full mb-5 aspect-square"
              />

              <div className="flex flex-col items-center justify-center mb-5">
                <div className="text-lg font-semibold text-center">
                  {pageData?.name}
                </div>
                <div
                  className={`flex items-center justify-center px-2 rounded-lg text-xs h-full font-semibold ${
                    pageData.status === "verified"
                      ? "bg-emerald-200 text-emerald-800"
                      : "bg-orange-200 text-orange-800"
                  }`}
                >
                  {pageData.status}
                </div>
              </div>
              <div className="bg-accent text-sm font-smibold rounded px-2 font-semibold">
                Author - {pageData.id}
              </div>
            </div>

            <div className="w-2/3 bg-gray-100 p-10 rounded-lg flex flex-wrap">
              <div className="w-1/2 mb-5">
                <div className="text-gray-600">Phone Number:</div>
                <div>{pageData?.phone || "-"}</div>
              </div>

              <div className="w-1/2 mb-5">
                <div className="text-gray-600">Email Address:</div>
                <div>{pageData?.email}</div>
              </div>

              <div className="w-1/2 mb-5">
                <div className="text-gray-600">Account Type:</div>
                <div>
                  {pageData.account_type.slice(0, 1).toUpperCase() +
                    pageData?.account_type.slice(
                      1,
                      pageData.account_type.length
                    )}
                </div>
              </div>
            </div>
          </div>

          <button className="bg-red-600 h-10 px-5 self-end mr-10 rounded text-white text-sm font-semibold">
            Suspend User
          </button>
        </div>
      ) : (
        ""
      )}

      {loading === "page" ? <PageLoading /> : ""}
      {loading === "error" ? <PageError /> : ""}
    </>
  );
};

type PageWrapperType = {
  params: Usable<any>;
};

const PageWrapper = ({ params }: PageWrapperType) => {
  const { id } = React.use(params);

  return (
    <SessionProvider>
      <Page id={id} />
    </SessionProvider>
  );
};
export default PageWrapper;
