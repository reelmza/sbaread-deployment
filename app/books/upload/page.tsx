"use client";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import ThemeSpacer from "@/components/ThemeSpacer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { attachHeaders, localAxios } from "@/lib/axios";
import { CloudUpload, MoveRight, X } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type FormFileUpload = {
  label: string;
  name: string;
  fileTypes: string;
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
          multiple={false}
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

const TableOfContents = () => {
  const [chapters, setChapters] = useState<
    | {
        name: string;
        pageNumber: string;
        children?: {
          title: string;
          pageNumber: string;
          children?: { name: string; pageNumber: string }[];
        }[];
      }[]
    | null
  >(null);

  return (
    <div className="w-full">
      <div>Chapter 1</div>
    </div>
  );
};
const BookUpload = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const createBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Define target types
    const target = e.target as typeof e.target & {
      bookTitle: { value: string };
      bookSubtitle: { value: string };
      bookGenre: { value: string };
      bookAbout: { value: string };
      bookAudience: { value: string };
      bookTags: { value: string };
      bookAuthors: { value: string };
      bookPrice: { value: string };
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
      formData.append("books[0][isbn]", target.bookISBN.value);

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

      // Iterate and populate authors list
      target.bookAuthors.value.split(",").forEach((author, key) => {
        console.log(`Appended: books[0][author][${key}] - ${author}`);
        formData.append(`books[0][authors][${key}]`, author);
      });

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
      // const res = await localAxios.post("/books", formData());

      // if (res.status === 201) {
      //   toast.success("Book has been created successfully", {
      //     richColors: true,
      //     position: "bottom-left",
      //   });
      // }

      setTimeout(() => {
        toast.success("Book has been created successfully", {
          richColors: true,
          position: "bottom-left",
        });

        setLoading(null);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(null);
    }
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
                21 Chapters
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
                <DialogContent className="w-[30%]">
                  <DialogHeader>
                    <DialogTitle className="font-medium">
                      Manage Table of Contents
                    </DialogTitle>
                    <ThemeSpacer size="unit" />
                    <TableOfContents />
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
        <Input
          name="bookAuthors"
          type="text"
          label="Book Authors"
          placeholder="Enter a list of audience"
          defaultValue="4,5"
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
