"use client";
import PageError from "@/components/PageError";
import PageLoading from "@/components/PageLoading";
import { attachHeaders, localAxios } from "@/lib/axios";
import { AxiosError } from "axios";
import { BookOpen, Send, Wallet } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type PageData = {
  active_subscription_count: number;
  author_count: number;
  pending_books_count: number;
  published_books_count: number;
  reader_count: number;

  recent_book_uploads: { title: string; authors: { name: string }[] }[];
  recent_signups: {
    name: string;
    account_type: string;
    email: string;
    status: string;
  }[];
  recent_transactions: {
    amount: number;
    description: string;
    currency: "USD" | "NGN";
    direction: string;
  }[];
};
const Dashboard = () => {
  const { data: session } = useSession();
  const controller = new AbortController();
  const [loading, setLoading] = useState<string | null>("page");
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    if (!session) return;
    const fetchData = async () => {
      try {
        attachHeaders(session!.user.token);
        const res = await localAxios(`/admin/dashboard`, {
          signal: controller.signal,
        });

        if (res.data) {
          console.log(res);
          setPageData(res.data.data);
          setLoading(null);
        }
      } catch (error) {
        console.log(error);

        if ((error as AxiosError).name !== "CanceledError") {
          setLoading("error");
        }
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [session]);

  return (
    <>
      {pageData && loading !== "page" ? (
        <div className="w-full h-full flex flex-col">
          {/* Card and Stats */}
          <div className="flex justify-between w-full px-10 mb-10">
            {/* Card */}
            <div className="w-7/12 bg-accent text-white p-8 rounded">
              {/* Welcome Text */}
              <div className="mb-5">
                <div className="text-3xl font-bold">Welcome Back, Admin</div>
                <p className="text-accent-tint">
                  Pick right back up from your previous task
                </p>
              </div>

              {/* Task */}
              <div className="w-full">
                <Link href={"/books"}>
                  <div className="w-full h-14 bg-accent-tint flex items-center justify-between px-5 rounded-md mb-4">
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
                </Link>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="flex items-center flex-wrap h-fit gap-y-5 w-4/12">
              {/* No Readers */}
              <div className="w-1/2 flex items-center gap-4">
                <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
                  <BookOpen size={16} strokeWidth={2} />
                </div>
                <div className="grow">
                  <div className="font-semibold">{pageData?.reader_count}</div>
                  <p className="text-sm text-accent">Readers</p>
                </div>
              </div>

              {/* No Authors */}
              <div className="w-1/2 flex items-center gap-4">
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
                  <div className="font-semibold"> {pageData?.author_count}</div>
                  <p className="text-sm text-accent">Authors</p>
                </div>
              </div>

              {/* No Published Books */}
              <div className="w-1/2 flex items-center gap-4">
                <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
                  <Send size={20} strokeWidth={1.5} />
                </div>
                <div className="grow">
                  <div className="font-semibold">
                    {pageData?.published_books_count}
                  </div>
                  <p className="text-sm text-accent">Active Books</p>
                </div>
              </div>

              {/* No active subs */}
              <div className="w-1/2 flex items-center gap-4">
                <div className="shrink-0 h-12 w-12 bg-accent flex items-center justify-center rounded-full text-accent-dark">
                  <Wallet size={20} strokeWidth={1.5} />
                </div>
                <div className="grow">
                  <div className="font-semibold">
                    {" "}
                    {pageData?.active_subscription_count}
                  </div>
                  <p className="text-sm text-accent">Subscriptions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="px-10">
            {/* Heading */}
            <div className="flex items-center mb-5">
              <div className="pr-4 text-lg text-accent-dark font-semibold">
                Recent Activities
              </div>
              <div className="grow h-[1px] bg-gray-100 rounded-md"></div>
            </div>

            {/* Cards */}
            <div className="w-full flex justify-between pb-20">
              {/* Recent Uploads */}
              <div className="flex flex-col w-[32%] h-fit shadow rounded-md overflow-hidden">
                {/* Heading */}
                <div className="flex items-center justify-between bg-accent h-14 px-5">
                  <div className="font-semibold text-accent-dark">
                    Books Uploaded
                  </div>
                  <div className="h-5 flex items-center justify-center px-3 rounded-full text-sm bg-neutral-50">
                    {pageData.recent_book_uploads.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 grow">
                  {/* Activity */}
                  {pageData.recent_book_uploads.slice(0, 5).map((book, key) => {
                    return (
                      <div className="flex items-centser gap-2 mb-2" key={key}>
                        <div className="w-full flex flex-col text-gray-600">
                          <div className="w-full flex items-center justify-between overflow-hidden leading-none text-xs font-semibold">
                            <div className={`text-xs font-semibold`}>
                              {book.authors[0].name}
                            </div>
                          </div>

                          <div className="text-sm">{book.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Button */}
                <Link
                  href={"/books"}
                  className="w-fit h-8 hover:text-accent-dark mx-5 bg-accesnt flex items-center gap-2 mb-5 rounded text-sm"
                >
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
                </Link>
              </div>

              {/* Recent Signups */}
              <div className="flex flex-col w-[32%] h-fit shadow rounded-md overflow-hidden">
                {/* Heading */}
                <div className="flex items-center justify-between bg-accent h-14 px-5">
                  <div className="font-semibold text-accent-dark">
                    Recent Signups
                  </div>
                  <div className="h-5 flex items-center justify-center px-3 rounded-full text-sm bg-neutral-50">
                    {pageData.recent_signups.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 grow">
                  {/* Activity */}
                  {pageData.recent_signups.slice(0, 5).map((user, key) => {
                    return (
                      <div className="flex items-centser gap-2 mb-2" key={key}>
                        <div className="w-full flex flex-col text-gray-600">
                          <div className="w-full flex items-center justify-between overflow-hidden text-xs font-semibold">
                            {user.account_type.slice(0, 1).toUpperCase()}
                            {user.account_type.slice(
                              1,
                              user.account_type.length
                            )}

                            <div
                              className={`ml-2 mr-1 text-[10px] font-medium ${
                                user.status === "verified" ||
                                user.status === "active"
                                  ? "text-emerald-600 bg-emerald-100 px-[5px] py-[2px] rounded-full"
                                  : "text-red-600  bg-red-100"
                              }`}
                            >
                              {user.status}
                            </div>
                          </div>

                          <div className="text-sm">{user.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Button */}
                <Link
                  href={"/authors"}
                  className="w-fit h-8 hover:text-accent-dark mx-5 bg-accesnt flex items-center gap-2 mb-5 rounded text-sm"
                >
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
                </Link>
              </div>

              {/* Recent Transactions */}
              <div className="flex flex-col w-[32%] h-fit shadow rounded-md overflow-hidden">
                {/* Heading */}
                <div className="flex items-center justify-between bg-accent h-14 px-5">
                  <div className="font-semibold text-accent-dark">
                    Recent Transactions
                  </div>
                  <div className="h-5 flex items-center justify-center px-3 rounded-full text-sm bg-neutral-50">
                    {pageData.recent_transactions.length}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 grow">
                  {pageData.recent_transactions.length > 0 ? (
                    pageData.recent_transactions.slice(0, 5).map((txn, key) => {
                      return (
                        <div
                          className="flex items-centser gap-2 mb-2"
                          key={key}
                        >
                          <div className="flex flex-col text-gray-600">
                            <div
                              className={`overflow-hidden font-semibold text-xs ${
                                txn.direction === "credit"
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              <span>{txn.currency === "USD" ? "$" : "₦"}</span>
                              {new Intl.NumberFormat("en-US", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                              }).format(txn.amount)}
                              {txn.direction === "credit" ? "-" : "+"}
                            </div>

                            <div className="text-sm">
                              {txn.description.length > 30
                                ? txn.description.slice(0, 30) + "..."
                                : txn.description}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-600 text-sm">
                      No transactions yet
                    </div>
                  )}
                </div>

                {/* Button */}
                <Link
                  href={"/payments"}
                  className="w-fit h-8 hover:text-accent-dark mx-5 bg-accesnt flex items-center gap-2 mb-5 rounded text-sm"
                >
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
                </Link>
              </div>
            </div>
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

const DashboardWrapper = () => {
  return (
    <SessionProvider>
      <Dashboard />
    </SessionProvider>
  );
};

export default DashboardWrapper;
