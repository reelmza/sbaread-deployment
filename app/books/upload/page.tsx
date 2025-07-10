"use client";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import ThemeSpacer from "@/components/ThemeSpacer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { attachHeaders, localAxios } from "@/lib/axios";
import { CloudUpload, Divide, MoveRight, PenBox, X } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";
import { authors } from "@/lib/authors";

type FormFileUpload = {
  label: string;
  name: string;
  fileTypes: string;
};

type Chapter = {
  name: string;
  pageNumber: string;
  children?: Chapter[];
};

type TableOfContents = {
  pageData: {
    chapters: Chapter[] | null;
    setChapters: Dispatch<SetStateAction<Chapter[] | null>>;
  };
};

const FormFileUpload = ({ label, name, fileTypes }: FormFileUpload) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const updateFileInfo = (e: React.SyntheticEvent) => {
    // Define target type
    const target = e.target as typeof e.target & {
      files: File[];
    };

    // Abort function if user didn't select a file after clicking
    if (!target.files[0]) {
      return;
    }

    // Get file info
    const fileName = target.files[0].name;
    const fileSize = target.files[0].size;

    // Convert file size from default bytes to correct unit (KB/MB)

    if (fileSize > 5_000_000_000) {
      return;
    }

    // Kilobytes
    if (fileSize > 1_000) {
      const formatedFileSize = (fileSize / 1_000).toFixed(2);
      console.log(formatedFileSize);
      setFileInfo({ name: fileName, size: formatedFileSize + "KB" });
    }

    // Megabytes
    if (fileSize > 1_000_000) {
      const formatedFileSize = (fileSize / 1_000_000).toFixed(2);

      setFileInfo({ name: fileName, size: formatedFileSize + "MB" });
    }
  };

  return (
    <div className="relative">
      {/* File Upload Title */}
      <div className="text-sm">
        {label}{" "}
        <span className="text-gray-400 mb-2 text-xs italic font-light">
          {" "}
          - required
        </span>
      </div>
      <ThemeSpacer size="unit" />

      {/* File Upload Content */}
      <div className="relative w-full h-[10rem] flex flex-col items-center justify-center bg-accent-light rounded-md cursor-pointer hover:opacity-75 active:opacity-100">
        {/* Choose File */}
        <input
          ref={fileRef}
          name={name}
          type="file"
          className="absolute top-0 left-0 bg-red-100 opacity-0 h-full w-full cursor-pointer"
          accept={
            name === "bookCover" ? "image/*,.png,.jpeg,.jpg" : "image/*,.pdf"
          }
          multiple={true}
          onChange={updateFileInfo}
        />

        {/* Instructions */}
        <div className="flex flex-col items-center">
          <CloudUpload
            size={44}
            strokeWidth={1.5}
            className="text-accent-dark"
          />
          <ThemeSpacer size="unit" />

          <div className="text-sm text-accent-dark font-semibold leading-6">
            {!fileInfo
              ? "Select file to Upload"
              : fileInfo.name.length > 15
              ? fileInfo.name.split(".")[0].slice(0, 15) + "..."
              : fileInfo.name}
          </div>

          <div className="text-xs text-accent">
            {!fileInfo
              ? fileTypes
              : fileInfo.size +
                " - " +
                fileInfo.name.split(".")[1].toUpperCase() +
                " File"}
          </div>
        </div>
      </div>

      {/* Cancel Button */}

      {fileInfo !== null ? (
        <button
          type="button"
          className="absolute top-10 right-3 flex items-center justify-center rounded-sm h-5 w-fit   cursor-pointer px-2 border border-accent text-accent"
          onClick={() => {
            fileRef!.current!.value = "";
            setFileInfo(null);
          }}
        >
          <X size={14} strokeWidth={1.5} className="text-accent-dark" />
        </button>
      ) : (
        ""
      )}

      <ThemeSpacer size="element" />
    </div>
  );
};

const TableOfContentsEdit = ({
  chapterName,
  chapterPageNumber,
  targetAddress,
  chapters,
  actionToDo,
  setChapters,
  setOpenEditModal,
}: {
  chapterName: string;
  chapterPageNumber: string;
  targetAddress: number[];
  chapters: Chapter[];
  actionToDo: string;
  setChapters: React.Dispatch<React.SetStateAction<Chapter[] | null>>;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeChapter, setActiveChapter] = useState<string[]>([
    chapterName,
    chapterPageNumber,
  ]);

  const updateChapters = (
    indexes: number[],
    input: string,
    pageNumber: string
  ) => {
    if (indexes.length === 0) {
      if (actionToDo === "add") {
        setChapters((prev) => {
          let data = prev as Chapter[];
          data.push({ name: input, pageNumber });
          console.log(data);
          return [...data];
        });
      }
      setOpenEditModal(false);
    }

    if (indexes.length == 1) {
      if (actionToDo === "edit") {
        setChapters((prev) => {
          let data = prev as Chapter[];
          data![indexes[0]].name = input;
          data![indexes[0]].pageNumber = pageNumber;
          console.log(indexes);
          console.log(data![indexes[0]]);

          return [...data];
        });
      }

      if (actionToDo === "add") {
        setChapters((prev) => {
          const data = prev as Chapter[];

          // If children exist
          if (data![indexes[0]].children) {
            data![indexes[0]].children?.push({ name: input, pageNumber });
          } else {
            data![indexes[0]].children = [{ name: input, pageNumber }];
          }
          console.log(data);
          return [...data];
        });
      }
      setOpenEditModal(false);
    }

    // if (indexes.length == 2) {
    //   if (actionToDo === "edit") {
    //     setChapters((prev) => {
    //       let data = prev as Chapter[];
    //       data![indexes[0]].children![indexes[1]].name = input;
    //       data![indexes[0]].children![indexes[1]].pageNumber = pageNumber;

    //       return [...data];
    //     });
    //   }

    //   if (actionToDo === "add") {
    //     setChapters((prev) => {
    //       let data = prev as Chapter[];

    //       if (data![indexes[0]].children![indexes[1]].children) {
    //         data![indexes[0]].children![indexes[1]].children = [
    //           { name: input, pageNumber },
    //         ];
    //       } else {
    //         data![indexes[0]].children![indexes[1]].children?.push({
    //           name: input,
    //           pageNumber,
    //         });
    //       }

    //       return [...data];
    //     });
    //   }

    //   setOpenEditModal(false);
    // }

    // if (indexes.length == 3) {
    //   setChapters((prev) => {
    //     let data = prev as Chapter[];
    //     data![indexes[0]].children![indexes[1]].children![indexes[2]].name =
    //       input;
    //     data![indexes[0]].children![indexes[1]].children![
    //       indexes[2]
    //     ].pageNumber = pageNumber;

    //     return [...data];
    //   });

    //   setOpenEditModal(false);
    // }
  };

  return (
    <>
      <div className="w-full flex items-center gap-4">
        {/* Section Title */}
        <div className="w-[70%]">
          <label htmlFor="title" className="text-sm mb-2 block font-semibold">
            Section Name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Edit section"
            className="w-full h-10 outline-none border rounded-md px-3 text-sm"
            defaultValue={
              targetAddress.length === 1
                ? chapters[targetAddress[0]].name
                : targetAddress.length === 2
                ? chapters[targetAddress[0]].children![targetAddress[1]].name
                : targetAddress.length === 3
                ? chapters[targetAddress[0]].children![targetAddress[1]]
                    .children![targetAddress[2]].name
                : ""
            }
            onChange={(e) =>
              setActiveChapter((prev) => {
                return [e.target.value, prev[1]];
              })
            }
            required
          />
        </div>

        {/* Page Number */}
        <div className="w-[30%]">
          <label htmlFor="title" className="text-sm mb-2 block font-semibold">
            Page Number
          </label>
          <input
            type="text"
            placeholder="Edit section"
            className="w-full h-10 outline-none border rounded-md px-3 text-sm"
            defaultValue={
              targetAddress.length === 1
                ? chapters[targetAddress[0]].pageNumber
                : targetAddress.length === 2
                ? chapters[targetAddress[0]].children![targetAddress[1]]
                    .pageNumber
                : targetAddress.length === 3
                ? chapters[targetAddress[0]].children![targetAddress[1]]
                    .children![targetAddress[2]].pageNumber
                : ""
            }
            onChange={(e) =>
              setActiveChapter((prev) => {
                return [prev[0], e.target.value];
              })
            }
            required
          />
        </div>
      </div>

      <ThemeSpacer size="element" />

      <button
        className="h-10 w-fit px-3 rounded-md text-sm bg-accent-dark hover:opacity-90 text-white cursor-pointer"
        onClick={() =>
          updateChapters(targetAddress, activeChapter[0], activeChapter[1])
        }
      >
        Update Section
      </button>
    </>
  );
};

const TableOfContents = ({ pageData }: TableOfContents) => {
  const { chapters, setChapters } = pageData;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [activeItem, setActiveItem] = useState<Chapter | null>(null);
  const [nestCount, setNestCount] = useState<number[] | null>(null);
  const [actionToDo, setActionToDo] = useState("add");

  return (
    <div className="w-full">
      {chapters !== null ? (
        <div>
          {/* TOC Accordion(s) */}
          <Accordion type="single" collapsible className="p-0">
            {chapters.map((item, key) => {
              return (
                <div className="relative border-b-0 h-fit" key={key}>
                  <div className="ml-[16px] cursor-pointer h-8 flex items-center hover:no-underline">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center text-xs text-gray-600 font-light  bg-resd-100 leading-none w-[38px] mt-[2px]">
                        CH {key + 1}
                      </div>
                      <div
                        className={` ${item.children ? "hover:underline" : ""}`}
                      >
                        {item.name}
                      </div>
                    </div>
                  </div>

                  {/* Absolute elements */}
                  {/* Edit Edit Button */}
                  <button
                    onClick={() => {
                      setActiveItem(item);
                      setOpenEditModal(true);
                      setNestCount([key]);
                    }}
                    className="absolute top-0 h-8 z-10 cursor-pointer"
                  >
                    <PenBox size={16} />
                  </button>

                  {/* Add Button, added to end of last element*/}
                  {key === chapters.length - 1 ? (
                    <button
                      onClick={() => {
                        setActiveItem(item);
                        setNestCount([]);
                        setActionToDo("add");
                        setOpenEditModal(true);
                      }}
                      className="top-0 h-8 z-10 cursor-pointer text-sm"
                    >
                      Add section LV 1
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </Accordion>

          {/* TOC Modal  */}
          <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
            <DialogContent>
              <DialogHeader className="mb-2">
                <DialogTitle>Edit Chapter </DialogTitle>
                <DialogDescription>
                  Update the selected chapters information
                </DialogDescription>
              </DialogHeader>

              <TableOfContentsEdit
                chapterName={activeItem?.name as string}
                chapterPageNumber={activeItem?.pageNumber as string}
                chapters={chapters}
                actionToDo={actionToDo}
                setChapters={setChapters}
                setOpenEditModal={setOpenEditModal}
                targetAddress={nestCount as number[]}
              />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>No chapters added yet, please add a chapter to continue</div>
      )}
    </div>
  );
};

const BookUpload = () => {
  const { data: session } = useSession();

  const authorsSearchInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[] | null>([
    {
      name: "Data Structures and Common Patterns",
      pageNumber: "2",
      children: [
        {
          name: "Stack Data Structures",
          pageNumber: "2",
          // children: [
          //   { name: "Array Pop Method", pageNumber: "3" },
          //   { name: "Array Shift Mehtod", pageNumber: "4" },
          //   { name: "C++ Implementation of Array Pop", pageNumber: "5" },
          // ],
        },

        {
          name: "List Data Structures",
          pageNumber: "7",
          children: [
            {
              name: "Java Implementation of Shifting Operations",
              pageNumber: "8",
            },
            { name: "List Casting and Time Complexities", pageNumber: "9" },
            { name: "Data Parsing and Time Efficiency", pageNumber: "10" },
          ],
        },
      ],
    },

    {
      name: "Modern Algorithms and System Perfomance",
      pageNumber: "2",
      children: [
        {
          name: "Stack Data Structures",
          pageNumber: "2",
          children: [
            { name: "Array Pop Method", pageNumber: "3" },
            { name: "Array Shift Mehtod", pageNumber: "4" },
            { name: "C++ Implementation of Array Pop", pageNumber: "5" },
          ],
        },

        {
          name: "List Data Structures",
          pageNumber: "7",
          children: [
            {
              name: "Java Implementation of Shifting Operations",
              pageNumber: "8",
            },
            { name: "List Casting and Time Complexities", pageNumber: "9" },
            { name: "Data Parsing and Time Efficiency", pageNumber: "10" },
          ],
        },
      ],
    },
  ]);
  const [selectedAuthors, setSelectedAuthors] = useState<
    { id: string; name: string }[]
  >([]);

  const [authorsSearch, setAuthorsSearch] = useState<
    { id: string; name: string }[]
  >([]);

  const createBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Define target types
    const target = e.target as typeof e.target & {
      bookTitle: { value: string };
      bookSubtitle: { value: string };
      bookPublisher: { value: string };
      bookGenre: { value: string };
      bookAbout: { value: string };
      bookAudience: { value: string };
      bookTags: { value: string };
      bookAuthors: { value: string };
      bookActualPrice: { value: string };
      bookDiscountedPrice: { value: string };
      bookISBN: { value: string };
      bookCover: { files: File[] };
      bookFiles: { files: File[] };
    };

    // Create form-data
    const formData = () => {
      const formData = new FormData();

      // Basic Information
      formData.append("books[0][title]", target.bookTitle.value);
      formData.append("books[0][sub_title]", target.bookSubtitle.value);
      formData.append("books[0][description]", target.bookAbout.value);
      formData.append("books[0][author_id]", session!.user.id);
      formData.append("books[0][publisher]", target.bookPublisher.value);

      formData.append("books[0][isbn]", target.bookISBN.value);
      formData.append(
        "books[0][pricing][actual_price]",
        target.bookActualPrice.value
      );
      formData.append(
        "books[0][pricing][discounted_price]",
        target.bookDiscountedPrice.value
      );

      // Table of contents
      formData.append("books[0][table_of_contents][0][index]", " Chapter 1");
      formData.append(
        "books[0][table_of_contents][0][description]",
        "Stack Data Structures"
      );

      // Iterate and populate book tags list
      target.bookTags.value.split(",").forEach((tag, key) => {
        console.log(`Appended: books[0][tags][${key}] - ${tag}`);
        formData.append(`books[0][tags][${key}]`, tag);
      });

      // Iterate and target audience
      target.bookAudience.value.split(",").forEach((tag, key) => {
        console.log(`Appended: books[0][targetAudience][${key}] - ${tag}`);
        formData.append(`books[0][target_audience][${key}]`, tag);
      });

      // Iterate and populate authors list
      selectedAuthors.forEach((author, key) => {
        console.log(`Appended: books[0][author][${key}] - ${author}`);
        formData.append(`books[0][authors][${key}]`, author.id);
      });
      // formData.append(`books[0][authors][1]`, "1");

      // Book Cover Image
      formData.append("books[0][cover_image]", target.bookCover.files[0]);

      // Iterate and populate uploaded files
      for (let i = 0; i < target.bookFiles.files.length; i++) {
        const file = target.bookFiles.files[i];
        formData.append(`books[0][files][${i}]`, file);
        console.log(`Appended: books[0][files][${i}] - ${file.name}`);
      }

      // Meta Data
      formData.append("books[0][meta_data][pages]", " 40");
      formData.append("books[0][meta_data][publisher_location]", "Nigeria");

      return formData;
    };

    setLoading("createBook");
    try {
      attachHeaders(session!.user.token, "multipart/form-data");
      const res = await localAxios.post("/books", formData());

      if (res.status === 201) {
        toast.success("Book has been created successfully", {
          richColors: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(null);
      toast.error("An error occured", {
        richColors: true,
        position: "bottom-left",
      });
    }
  };

  const removeAuthor = (authorToRemove: { name: string; id: string }) => {
    const filter = selectedAuthors.filter(
      (author) => author.name !== authorToRemove.name
    );

    setSelectedAuthors(filter);
  };

  const searchUser = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      value: string;
    };

    const targetResult = authors.filter((item) =>
      item.name.includes(target.value)
    );

    setAuthorsSearch(targetResult);
  };

  return (
    <form className="px-10 w-full flex justify-between" onSubmit={createBook}>
      {/* Images Upload */}
      <div className="w-[25%] bg-amsber-100">
        <div className="fixed w-[calc(25%-5rem)] top-28">
          {/* Book Cover */}
          <FormFileUpload
            label="Book Cover"
            name={"bookCover"}
            fileTypes="JPG, JPEG, PNG"
          />

          {/* Table of Content */}
          <div className="mb-5">
            {/* Title */}
            <div className="mb-2 text-sm">
              Table of Content
              <span className="text-xs text-gray-400 italic font-light ml-1">
                - Required
              </span>
            </div>

            {/* Content */}
            <div className="w-full flex items-center justify-between gap-2">
              <div className="text-sm text-gray-400 font-light">
                {} Chapters
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-sm cursor-pointer text-accent-dark flex items-center gap-2"
                  >
                    <span>Edit Chapters</span>
                    <MoveRight size={14} strokeWidth="1.5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="min-w-[40%] h-[80%]">
                  <DialogHeader>
                    <DialogTitle className="font-semibold">
                      Manage Table of Contents
                    </DialogTitle>
                    <ThemeSpacer size="unit" />

                    {/* Content */}
                    <TableOfContents pageData={{ chapters, setChapters }} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Content Upload*/}
          <FormFileUpload
            label="Book Files"
            name={"bookFiles"}
            fileTypes="PDF, ePub"
          />
        </div>
      </div>

      {/* Book Details */}
      <div className="w-[70%] bg-ambesr-100">
        {/* Book Title */}
        <Input
          name="bookTitle"
          type="text"
          label="Book Title"
          placeholder="Enter book title"
          defaultValue="Discrete Structures & Algorithm"
          required
        />

        {/* Book Subtitle */}
        <Input
          name="bookSubtitle"
          type="text"
          label="Book Subtitle"
          placeholder="Enter book subtitle"
          defaultValue="6th Edition"
          required
        />

        {/* About Book */}
        <Input
          name="bookAbout"
          type="textarea"
          label="About Book"
          placeholder="Provide brief description"
          defaultValue="A comprehensive tertiary level guide to data structures and algorithms for computing majors."
          required
        />

        {/* Book Genre */}
        <Input
          name="bookGenre"
          type="text"
          label="Book Genre"
          placeholder="Enter book subtitle"
          defaultValue="fiction,novel"
        />

        {/* Book Tags */}
        <Input
          name="bookTags"
          type="text"
          label="Book Tags"
          placeholder="Enter a list of tags"
          defaultValue="drama,thrilling,english"
        />

        {/* Book Audience */}
        <Input
          name="bookAudience"
          type="text"
          label="Book Audience"
          placeholder="Enter a list of audience"
          defaultValue="fiction,novel"
        />

        {/* Authors */}

        <div className="w-full flex flex-col">
          {/* Author Lable */}
          <label htmlFor="bookAuthors" className="text-sm mb-2">
            Book Authors
          </label>

          {/* Content */}
          <div className="w-full relative flex items-center bg-gray-100 border outline-none h-12 rounded-md px-5 mb-2">
            {/* Displayer */}
            <div className="flex items-center justify-center text-sm">
              {selectedAuthors.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="mr-1 bg-gray-300 px-2 rounded-md flex items-center gap-1"
                  >
                    <span>{item.name}</span>
                    <button
                      className="flex items-center justify-center"
                      onClick={() => removeAuthor(item)}
                      type="button"
                    >
                      <X size={12} className="cursor-pointer" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <input
              name="bookAuthors"
              type="text"
              placeholder="Type an author name"
              className="bg-transparent border-none outline-none text-sm"
              defaultValue=""
              ref={authorsSearchInput}
              onChange={(e) => searchUser(e)}
              required
            />

            {/* Search drop down */}
            {authorsSearch.length > 0 ? (
              <div className="absolute top-[5rem] left-0 min-h-12 w-full bg-white border rounded-md p-2">
                {authorsSearch.slice(0, 4).map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="text-sm hover:bg-gray-100 cursor-pointer px-3 rounded-md py-[5px]"
                      onClick={() => {
                        setSelectedAuthors((prev) => {
                          if (prev.length < 1) {
                            console.log([item]);
                            return [item];
                          }
                          return [...prev, item];
                        });

                        setAuthorsSearch([]);
                        authorsSearchInput!.current!.value = "";
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Publisher */}
        <Input
          name="bookPublisher"
          type="text"
          label="Book Publishers"
          placeholder="Provide a publisher"
          defaultValue="Elsevier"
          required
        />

        {/* Divider */}
        <ThemeSpacer size="component" />
        <div className="w-full h-[1px] bg-gray-400"></div>
        <ThemeSpacer size="section" />

        {/* Book Prices */}
        <div className="flex items-center justify-between w-full flex-wrap">
          {/* Book Actual Price */}
          <div className="w-full lg:w-[48%]">
            <Input
              name="bookActualPrice"
              type="number"
              label="Book Actual Price"
              placeholder="Provide a price"
              defaultValue="3850"
              required
            />
          </div>

          {/* Book Discounted Price */}
          <div className="w-full lg:w-[48%]">
            <Input
              name="bookDiscountedPrice"
              type="number"
              label="Book Discounted Price"
              placeholder="Provide a price"
              defaultValue="3850"
              required
            />
          </div>
        </div>

        {/* Book ISBN */}
        <Input
          name="bookISBN"
          type="text"
          label="Book ISBN"
          placeholder="Provide an ISBN number"
          defaultValue="974-32324448"
          required
        />
        <ThemeSpacer size="component" />
        {/* Submit */}
        <button
          className={`flex items-center gap-2 h-12 bg-accent-dark hover:opacity-90 px-8 rounded-md text-white mb-20 cursor-pointer ${
            loading === "createBook" ? "opacity-75 pointer-events-none" : ""
          }`}
          disabled={loading === "createBook"}
        >
          <span>Upload Book</span>
          {loading === "createBook" ? <Spinner className="size-5" /> : ""}
        </button>
      </div>
    </form>
  );
};

const BookUploadWrapper = () => {
  return (
    <SessionProvider>
      <BookUpload />
    </SessionProvider>
  );
};

export default BookUploadWrapper;
