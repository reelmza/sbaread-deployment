"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Search, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { attachHeaders, localAxios } from "@/lib/axios";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";

import ThemeSpacer from "@/components/ThemeSpacer";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import PageLoading from "@/components/PageLoading";
import PageError from "@/components/PageError";

type Book = {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  authors: {
    id: string;
    name: string;
  }[];
  publisher: string;
  cover_image: {
    public_url: string;
  };
  status: string;
  approved_by: number;
  currency: string;
  discounted_price: string;
};

type BookType = {
  setModalState: (val: boolean) => void;
  setActiveBook: React.Dispatch<React.SetStateAction<Book | null>>;
  book: Book;
};

const Book = ({ book, setActiveBook, setModalState }: BookType) => {
  return (
    <div
      className="shadow w-[48%] rounded-md overflow-hidden shrink-0 mb-5 cursor-pointer  font-sans"
      onClick={() => {
        setActiveBook(book);
        setModalState(true);
      }}
    >
      <div className="w-full h-32 overflow-hidden">
        <Image
          src={book?.cover_image?.public_url}
          alt="A book cover"
          height={500}
          width={500}
        />
      </div>

      <div className="flex justify-between p-4">
        <div>
          <div className="font-semibold leading-5 mb-2">{book?.title}</div>
          <div className="text-sm text-gray-600">
            {book?.publisher || "No Publisher"}
          </div>
        </div>

        <div className="w-20 flex items-center justify-center bg-accent text-sm rounded-full h-8 font-semibold">
          #10,000
        </div>
      </div>
    </div>
  );
};

const Books = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [pageData, setPageData] = useState<Book[] | null>(null);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<string | null>("page");
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    const getBooks = async () => {
      attachHeaders(session!.user.token);
      console.log(session);
      try {
        const res = await localAxios.get("/books");
        console.log(res);
        if (res.status === 200) {
          const data = res.data.data;
          setPageData(data);
        }

        setLoading(null);
      } catch (error) {
        console.log(error);
        setLoading("error");
      }
    };

    getBooks();

    return () => {};
  }, [session]);

  const changeBookStatus = async (id: number, action: string) => {
    setLoading(`${action === "approve" ? "approveBook" : "declineBook"}`);
    try {
      attachHeaders(session!.user.token);
      const res = await localAxios.post(`/books/${action}/${id}`, {
        note: "Not qualitative enough.",
      });

      console.log(res);
      if (res.status === 200 || res.status === 201) {
        toast.success(
          `Book ${action == "approve" ? "approved" : "declined"} successfully`,
          {
            richColors: true,
            position: "bottom-left",
          }
        );
      }

      setLoading(null);
    } catch (error) {
      console.log(error);
      toast.error("An error occured, try again", {
        richColors: true,
        position: "bottom-left",
      });

      setLoading(null);
    }
  };

  return (
    <>
      {pageData && loading !== "page" ? (
        <div className="px-10 w-full flex justify-between">
          <div className="w-[55%] flex items-center justify-between flex-wrap">
            {pageData?.map((book, key) => {
              return (
                <Book
                  book={book}
                  setModalState={setModalState}
                  setActiveBook={setActiveBook}
                  key={key}
                />
              );
            })}
          </div>
          <div className="w-[40%]">
            <div className="fixed top-28 right-10 w-[calc(40%-7.7rem)] h-12">
              {/* Search Bar */}
              <div className="h-12 w-full bg-gray-100 rounded-md flex items-center mb-5">
                <div className="flex items-center justify-center w-12">
                  <Search
                    size={20}
                    strokeWidth={1.5}
                    className="text-neutral"
                  />
                </div>
                <input
                  type="text"
                  className="grow bg-transparent outline-none text-neutral-600 text-sm"
                  placeholder="Search for a book"
                />
              </div>

              {/* Stats */}
              <div className="mb-5">
                <div className=" flex items-center w-full h-14 px-5 bg-accent-light  border-2 border-accent rounded-md mb-2">
                  <div className="text-accent flex items-center">
                    Books Published:{" "}
                    <div className="text-accent-dark ml-2">
                      {pageData.length}
                    </div>
                  </div>
                </div>

                <div className=" flex items-center w-full h-14 px-5 bg-accent-light  border-2 border-accent rounded-md">
                  <div className="text-accent flex items-center">
                    Books Sold: <div className="text-accent-dark ml-2">1</div>
                  </div>
                </div>
              </div>

              {/* Upload  */}
              <Link href={"/books/upload"}>
                <div className="w-full flex items-center gap-5 cursor-pointer mb-5">
                  <div className="h-16 w-16 bg-accent-light text-accent rounded-full flex items-center justify-center">
                    <Upload size={20} strokeWidth={2} />
                  </div>

                  <div>Upload New Book</div>
                </div>
              </Link>

              {/* Book Request */}
              <div className="w-full min-h-[14rem] shadow  rounded-md overflow-hidden mb-20">
                {/* Heading */}
                <div className="flex items-center justify-between bg-accent h-14 px-5">
                  <div className="font-semibold text-accent-dark">
                    New Book Requests
                  </div>
                  <div className="h-5 flex items-center justify-center px-3 rounded-md text-sm bg-neutral-50">
                    32
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Activity */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    <div className="text-sm text-gray-600">
                      Teach me to pray
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    <div className="text-sm text-gray-600">Notes from PM</div>
                  </div>
                </div>

                {/* Button */}
                <button className="h-8 px-5 mx-5 bg-accent flex items-center gap-2 mb-5 rounded-md">
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
                </button>
              </div>

              <div className="h-20"></div>
            </div>
          </div>

          <Dialog open={modalState} onOpenChange={setModalState}>
            <DialogContent className="min-w-[50%] min-h-[80%] flex flex-col">
              <DialogHeader>
                <VisuallyHidden>
                  <DialogTitle className="text-accent-dark text-2xl font-primary font-bold">
                    Password Updated!
                  </DialogTitle>
                </VisuallyHidden>
              </DialogHeader>

              {/* Heading */}
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src={activeBook?.cover_image.public_url || "/woman.jpg"}
                    alt="African Woman"
                    width={50}
                    height={50}
                    className="rounded-full aspect-square"
                  />

                  <div>
                    <div className="text-lg font-semibold">
                      {activeBook?.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activeBook?.sub_title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className={`h-8 w-28 bg-emerald-600 rounded-md text-white text-sm cursor-pointer flex items-center justify-center gap-2 ${
                      loading === "approveBook"
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => changeBookStatus(activeBook!.id, "approve")}
                    disabled={loading == "approveBook"}
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
                      loading === "declineBook"
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => changeBookStatus(activeBook!.id, "decline")}
                    disabled={loading !== null}
                  >
                    <span>Decline</span>
                    {loading === "declineBook" ? (
                      <Spinner className="size-4" />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </div>

              {/* Content */}
              <Accordion type="single" collapsible className="p-0">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} strokeWidth={2} />
                      <div>Book Details</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Description & Authors */}
                    <div className="flex flex-wrap justify-between">
                      {/* Description */}
                      <div className="w-[49%] bg-red- 100">
                        <div className="font-semibold mb-1">Description</div>
                        <p className="">{activeBook?.description}</p>
                      </div>

                      {/* Authors */}
                      <div className="w-[49%] bg-gr een-100">
                        <div className="font-semibold mb-1">Book Authors</div>
                        {activeBook?.authors.map((author, key) => {
                          return (
                            <Link
                              href={`/${author.id}`}
                              className="hover:text-blue-600 lowercase"
                              key={key}
                            >
                              {author.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <ThemeSpacer size="element" />

                    {/* Status and Approved By */}
                    <div className="flex items-center justify-between">
                      <div className="w-[49%]">
                        <div className="font-semibold mb-1">Status</div>
                        {activeBook?.status ? (
                          <p className="">
                            {activeBook!.status.slice(0, 1).toUpperCase() +
                              activeBook!.status.slice(
                                1,
                                activeBook!.status.length
                              )}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* <div className="w-[49%]">
                        <div className="font-semibold mb-1">Approved By</div>
                        <p className="">
                          {activeBook?.approved_by || "Not approved"}
                        </p>
                      </div> */}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} strokeWidth={2} />
                      <div>Content Upload</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="">
                      <div className="font-semibold mb-5">Uploaded Files</div>
                      <div className="flex items-center">
                        <div>
                          <div className="mb-1 ml-1 font-semibold">
                            Cover Photo
                          </div>
                          <Link
                            href={activeBook?.cover_image.public_url || ""}
                            className="w-fit px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 text-xs rounded-full"
                          >
                            {activeBook?.cover_image.public_url.slice(0, 30) +
                              "..."}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} strokeWidth={2} />
                      <div>Pricing & Licensing</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <div className="font-semibold">Discounted Price</div>
                      <div className="mb-5 text-sm">
                        {activeBook?.currency} {activeBook?.discounted_price}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        ""
      )}

      {loading === "page" ? <PageLoading /> : ""}
      {loading === "error" ? <PageError /> : ""}
    </>
  );
};

const BooksWrapper = () => {
  return (
    <SessionProvider>
      <Books />
    </SessionProvider>
  );
};
export default BooksWrapper;
