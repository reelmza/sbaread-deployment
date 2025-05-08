import { ChevronDown } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <form className=" px-10 w-full flex justify-between">
      <div className="w-[25%] bg-amsber-100">
        <div className="fixed w-[calc(25%-5rem)] top-28">
          {/* Book Cover */}
          <div className="mb-5">
            <div className="mb-2">
              Book Cover <span className="text-gray-600 mb-2">(Required)</span>
            </div>

            <div className="w-full h-[9rem] flex flex-col items-center justify-center bg-accent-light rounded-md">
              {/* Choose File */}
              <div className="h-5 w-28 flex items-center justify-between bg-accent-dark rounded-md overflow-hidden text-center text-accent-light mb-2">
                <div className="text-xs ml-2">Choose File</div>
                <div className="flex items-center justify-center bg-accent h-full w-5">
                  <ChevronDown size={14} strokeWidth={2} />
                </div>
              </div>

              <div className="text-sm text-accent-dark">
                or Drag 'n' drop file here
              </div>

              <div className="text-xs text-accent">
                Supported files: JPG, JPEG or PNG
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2">
              Table of Content{" "}
              <span className="text-gray-600 mb-2">(Required)</span>
            </div>

            <div className=" w-full flex items-center justify-between gap-2">
              <select
                name=""
                id=""
                className="text-xs bg-gray-100 text-gray-600 w-20 h-8 rounded-md"
              >
                <option value="Chapter 1">Chapter 1</option>
              </select>

              <input
                type="text"
                className="w-[60%] bg-transparent border rounded-md"
              />
            </div>
          </div>

          {/* Content Upload*/}
          <div className="mb-5">
            <div className="mb-2">
              Content Upload{" "}
              <span className="text-gray-600 mb-2">(Required)</span>
            </div>

            <div className="w-full h-[9rem] flex flex-col items-center justify-center bg-accent-light rounded-md">
              {/* Choose File */}
              <div className="h-5 w-28 flex items-center justify-between bg-accent-dark rounded-md overflow-hidden text-center text-accent-light mb-2">
                <div className="text-xs ml-2">Choose File</div>
                <div className="flex items-center justify-center bg-accent h-full w-5">
                  <ChevronDown size={14} strokeWidth={2} />
                </div>
              </div>

              <div className="text-sm text-accent-dark">
                or Drag 'n' drop file here
              </div>

              <div className="text-xs text-accent">
                Supported files: PDF, ePUB or DOCx
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] bg-ambesr-100">
        {/* Book Title */}
        <div className="flex flex-col mb-5">
          <label htmlFor="bookTitle" className="mb-2">
            Book Title <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <input
            type="text"
            className="bg-gray-100 h-12 rounded-md px-5"
            placeholder="Title of the book"
          />
        </div>

        {/* Book Subtitle */}
        <div className="flex flex-col mb-5">
          <label htmlFor="bookTitle" className="mb-2">
            Book Subtitle <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <input
            type="text"
            className="bg-gray-100 h-12 rounded-md px-5"
            placeholder="Title of the book"
          />
        </div>

        {/* Book Genre */}
        <div className="flex flex-col mb-5">
          <label htmlFor="bookTitle" className="mb-2">
            Book Genre <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <input
            type="text"
            className="bg-gray-100 h-12 rounded-md px-5"
            placeholder="Title of the book"
          />
        </div>

        {/* About Book */}
        <div className="flex flex-col mb-5">
          <label htmlFor="bookTitle" className="mb-2">
            About the book{" "}
            <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <textarea
            className="bg-gray-100 h-28 rounded-md p-5"
            placeholder="Say something about the book"
          />
        </div>

        {/* Book Audience */}
        <div className="flex flex-col mb-5">
          <label htmlFor="bookTitle" className="mb-2">
            Target Audience{" "}
            <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <textarea
            className="bg-gray-100 h-28 rounded-md p-5"
            placeholder="Say something about the book"
          />
        </div>

        {/* Author Bio */}
        <div className="flex flex-col mb-10">
          <label htmlFor="bookTitle" className="mb-2">
            Author's Bio <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <textarea
            className="bg-gray-100 h-28 rounded-md p-5"
            placeholder="Say something about the book author"
          />
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-gray-100 mb-10"></div>

        {/* Book Price */}
        <div className="flex flex-col mb-5">
          <label htmlFor="bookTitle" className="mb-2">
            Book Price <span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <input
            type="text"
            className="bg-gray-100 h-12 rounded-md px-5"
            placeholder="Enter a price"
          />
        </div>

        {/* Book ISBN */}
        <div className="flex flex-col mb-10">
          <label htmlFor="bookTitle" className="mb-2">
            ISBN Number<span className="text-gray-600 mb-2">(Required)</span>
          </label>

          <input
            type="text"
            className="bg-gray-100 h-12 rounded-md px-5"
            placeholder="Enter a ISBN Number"
          />
        </div>

        {/* Submit */}

        <button className="h-12 bg-accent px-8 rounded-md text-white float-right mb-20">
          Upload Book
        </button>
      </div>
    </form>
  );
};

export default Page;
