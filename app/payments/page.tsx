import { LineChart } from "@/components/LineChart";
import { PieChartX } from "@/components/PieChart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRight, ChevronDown, File, Search } from "lucide-react";
import React from "react";

const Page = () => {
  const tableData = [
    {
      username: "reelMza342",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "musa23",
      bookTitle: "48 Laws of Power",
      author: "Thomas Woo",
      amount: 21200,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "awelliee@yahoo.com",
      date: "20/5/2025",
    },
    {
      username: "abba23",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "reelMza342",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "musa23",
      bookTitle: "48 Laws of Power",
      author: "Thomas Woo",
      amount: 21200,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "awelliee@yahoo.com",
      date: "20/5/2025",
    },
    {
      username: "abba23",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "reelMza342",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "musa23",
      bookTitle: "48 Laws of Power",
      author: "Thomas Woo",
      amount: 21200,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "awelliee@yahoo.com",
      date: "20/5/2025",
    },
    {
      username: "abba23",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "reelMza342",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },

    {
      username: "musa23",
      bookTitle: "48 Laws of Power",
      author: "Thomas Woo",
      amount: 21200,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "awelliee@yahoo.com",
      date: "20/5/2025",
    },
    {
      username: "abba23",
      bookTitle: "Teach Me To Pray",
      author: "Musa Dia",
      amount: 43500,
      paymentMethod: "Bank Transfer",
      status: "Successfull",
      email: "jessemoses@yahoo.com",
      date: "20/4/2025",
    },
  ];

  return (
    <div className="px-10 min-h-full">
      {/* Overview Cards */}
      <div className="w-full flex items-center justify-between mb-10">
        {/* Overview Cards */}
        <div className="w-[22%]">
          <div className="w-full px-2 h-7 bg-accent text-white flex items-center justify-between text-sm rounded-t">
            <div>This Week</div>
            <ChevronDown size={14} strokeWidth={2} />
          </div>

          <div className="bg-accent-light w-full px-5 py-3 rounded-b min-h-[6rem]">
            <div className="text-accent text-xs font-semibold">
              Total Revenue
            </div>
            <div className="text-accent-dark text-xl font-bold mb-2">
              N12,334,343
            </div>

            <div className="bg-white h-5 w-fit rounded text-accent-dark px-2 text-xs flex items-center gap-1">
              <ArrowUpRight size={14} strokeWidth={2} />
              <span> 36% than last week</span>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="w-[22%]">
          <div className="w-full px-2 h-7 bg-accent text-white flex items-center justify-between text-sm rounded-t">
            <div>This Week</div>
            <ChevronDown size={14} strokeWidth={2} />
          </div>

          <div className="bg-accent-light w-full px-5 py-3 rounded-b min-h-[6rem]">
            <div className="text-accent text-xs font-semibold">
              Total Transaction
            </div>
            <div className="text-accent-dark text-xl font-bold mb-2">530</div>

            {/* <div className="bg-white h-5 w-fit rounded text-accent-dark px-2 text-xs flex items-center gap-1">
              <ArrowUpRight size={14} strokeWidth={2} />
              <span> 36% than last week</span>
            </div> */}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="w-[22%]">
          <div className="w-full px-2 h-7 bg-accent text-white flex items-center justify-between text-sm rounded-t">
            <div>This Week</div>
            <ChevronDown size={14} strokeWidth={2} />
          </div>

          <div className="bg-accent-light w-full px-5 py-3 rounded-b min-h-[6rem]">
            <div className="text-accent text-xs font-semibold">
              Pending Payouts
            </div>
            <div className="text-accent-dark text-xl font-bold mb-2">
              N280,543.80
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="w-[22%]">
          <div className="w-full px-2 h-7 bg-accent text-white flex items-center justify-between text-sm rounded-t">
            <div>This Week</div>
            <ChevronDown size={14} strokeWidth={2} />
          </div>

          <div className="bg-accent-light w-full px-5 py-3 rounded-b min-h-[6rem]">
            <div className="text-accent text-xs font-semibold">
              Most Purchased Books
            </div>
            <div className="text-accent-dark text-xl font-bold mb-2 leading-[20px]">
              Ministry and Money Matters
            </div>
          </div>
        </div>
      </div>
      {/* Graphs */}
      <div className="flex items-center justify-between mb-10">
        {/* Line Chart */}
        <div className="w-[60%]">
          <div className="px-5">Revenue Growth Chart</div>
          <LineChart />
        </div>

        {/* Pie Chart */}
        <div className="w-[30%]">
          <PieChartX />
        </div>
      </div>
      {/* Tables */}
      {/* Transactions */}
      <div className="w-full mb-10">
        {/* Section Heading */}

        <div className="w-full flex items-center justify-between mb-5">
          <div>Transaction History</div>
          <Dialog>
            <DialogTrigger>View All</DialogTrigger>
            <DialogContent className="min-w-2/3">
              <DialogHeader>
                <DialogTitle>Transaction History</DialogTitle>
              </DialogHeader>

              {/* Search and Export Options */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-72 bg-gray-100 rounded-md flex items-center">
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
                    placeholder="Search for a transaction"
                  />
                </div>

                <div className="flex items-center">
                  {/* PDF */}
                  <button className="flex items-center justify-center text-xs text-gray-600 border-r pr-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As PDF</div>
                  </button>

                  {/* Excel */}
                  <button className="flex items-center justify-center text-xs text-gray-600 border-r px-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As CSV</div>
                  </button>

                  {/* JPG */}
                  <button className="flex items-center justify-center text-xs text-gray-600 pl-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As JPG</div>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white text-sm">
                {/* Serial */}
                <div className="col-span-1">Txn Id</div>

                {/* User Name */}
                <div className="col-span-2">Username</div>

                {/* Book Title */}
                <div className="col-span-2">Book Title</div>

                {/* Author*/}
                <div className="col-span-2">Author</div>

                {/* Payment Mehtod */}
                <div className="col-span-2">Payment</div>

                {/* Status */}
                <div className="col-span-2">Status</div>

                {/* Date */}
                <div className="col-span-1">Date</div>
              </div>

              {/* Table Content */}
              {tableData.slice(0, 5).map((item) => {
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

                    {/* User Name */}
                    <div className="col-span-2">{item.username}</div>

                    {/* Book Title */}
                    <div className="col-span-2">{item.bookTitle}</div>

                    {/* Author*/}
                    <div className="col-span-2">{item.author}</div>

                    {/* Payment Mehtod */}
                    <div className="col-span-2">{item.paymentMethod}</div>

                    {/* Status */}
                    <div className="col-span-2">{item.status}</div>

                    {/* Date */}
                    <div className="col-span-1">{item.date}</div>
                  </div>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>

        {/* Table Heading */}
        <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white">
          {/* Serial */}
          <div className="col-span-1">Txn Id</div>

          {/* User Name */}
          <div className="col-span-2">Username</div>

          {/* Book Title */}
          <div className="col-span-2">Book Title</div>

          {/* Author*/}
          <div className="col-span-2">Author</div>

          {/* Payment Mehtod */}
          <div className="col-span-2">Payment</div>

          {/* Status */}
          <div className="col-span-2">Status</div>

          {/* Date */}
          <div className="col-span-1">Date</div>
        </div>

        {/* Table Content */}
        {tableData.slice(0, 3).map((item) => {
          return (
            <div
              className={`grid grid-cols-12 h-12 items-center px-5 text-gray-600 text-sm ${
                tableData.indexOf(item) % 2 === 0 ? "bg-gray-50" : ""
              }`}
              key={tableData.indexOf(item)}
            >
              {/* Serial */}
              <div className="col-span-1">{tableData.indexOf(item) + 1}</div>

              {/* User Name */}
              <div className="col-span-2">{item.username}</div>

              {/* Book Title */}
              <div className="col-span-2">{item.bookTitle}</div>

              {/* Author*/}
              <div className="col-span-2">{item.author}</div>

              {/* Payment Mehtod */}
              <div className="col-span-2">{item.paymentMethod}</div>

              {/* Status */}
              <div className="col-span-2">{item.status}</div>

              {/* Date */}
              <div className="col-span-1">{item.date}</div>
            </div>
          );
        })}
      </div>
      {/* Payout to Authors */}
      <div className="w-full mb-10">
        {/* Section Heading */}

        <div className="w-full flex items-center justify-between mb-5">
          <div>Payout to Authors</div>
          <Dialog>
            <DialogTrigger>View All</DialogTrigger>
            <DialogContent className="min-w-2/3">
              <DialogHeader>
                <DialogTitle>Transaction History</DialogTitle>
              </DialogHeader>

              {/* Search and Export Options */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-72 bg-gray-100 rounded-md flex items-center">
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
                    placeholder="Search for a transaction"
                  />
                </div>

                <div className="flex items-center">
                  {/* PDF */}
                  <button className="flex items-center justify-center text-xs text-gray-600 border-r pr-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As PDF</div>
                  </button>

                  {/* Excel */}
                  <button className="flex items-center justify-center text-xs text-gray-600 border-r px-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As CSV</div>
                  </button>

                  {/* JPG */}
                  <button className="flex items-center justify-center text-xs text-gray-600 pl-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As JPG</div>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white text-sm">
                {/* Serial */}
                <div className="col-span-1">Txn Id</div>

                {/* User Name */}
                <div className="col-span-2">Username</div>

                {/* Book Title */}
                <div className="col-span-2">Book Title</div>

                {/* Author*/}
                <div className="col-span-2">Author</div>

                {/* Payment Mehtod */}
                <div className="col-span-2">Payment</div>

                {/* Status */}
                <div className="col-span-2">Status</div>

                {/* Date */}
                <div className="col-span-1">Date</div>
              </div>

              {/* Table Content */}
              {tableData.slice(0, 5).map((item) => {
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

                    {/* User Name */}
                    <div className="col-span-2">{item.username}</div>

                    {/* Book Title */}
                    <div className="col-span-2">{item.bookTitle}</div>

                    {/* Author*/}
                    <div className="col-span-2">{item.author}</div>

                    {/* Payment Mehtod */}
                    <div className="col-span-2">{item.paymentMethod}</div>

                    {/* Status */}
                    <div className="col-span-2">{item.status}</div>

                    {/* Date */}
                    <div className="col-span-1">{item.date}</div>
                  </div>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>

        {/* Table Heading */}
        <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white">
          {/* Serial */}
          <div className="col-span-1">Txn Id</div>

          {/* User Name */}
          <div className="col-span-2">Username</div>

          {/* Book Title */}
          <div className="col-span-2">Book Title</div>

          {/* Author*/}
          <div className="col-span-2">Author</div>

          {/* Payment Mehtod */}
          <div className="col-span-2">Payment</div>

          {/* Status */}
          <div className="col-span-2">Status</div>

          {/* Date */}
          <div className="col-span-1">Date</div>
        </div>

        {/* Table Content */}
        {tableData.slice(0, 3).map((item) => {
          return (
            <div
              className={`grid grid-cols-12 h-12 items-center px-5 text-gray-600 text-sm ${
                tableData.indexOf(item) % 2 === 0 ? "bg-gray-50" : ""
              }`}
              key={tableData.indexOf(item)}
            >
              {/* Serial */}
              <div className="col-span-1">{tableData.indexOf(item) + 1}</div>

              {/* User Name */}
              <div className="col-span-2">{item.username}</div>

              {/* Book Title */}
              <div className="col-span-2">{item.bookTitle}</div>

              {/* Author*/}
              <div className="col-span-2">{item.author}</div>

              {/* Payment Mehtod */}
              <div className="col-span-2">{item.paymentMethod}</div>

              {/* Status */}
              <div className="col-span-2">{item.status}</div>

              {/* Date */}
              <div className="col-span-1">{item.date}</div>
            </div>
          );
        })}
      </div>
      {/* Refund & Disputes */}
      <div className="w-full mb-10">
        {/* Section Heading */}

        <div className="w-full flex items-center justify-between mb-5">
          <div>Refund & Disputes</div>
          <Dialog>
            <DialogTrigger>View All</DialogTrigger>
            <DialogContent className="min-w-2/3">
              <DialogHeader>
                <DialogTitle>Transaction History</DialogTitle>
              </DialogHeader>

              {/* Search and Export Options */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-72 bg-gray-100 rounded-md flex items-center">
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
                    placeholder="Search for a transaction"
                  />
                </div>

                <div className="flex items-center">
                  {/* PDF */}
                  <button className="flex items-center justify-center text-xs text-gray-600 border-r pr-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As PDF</div>
                  </button>

                  {/* Excel */}
                  <button className="flex items-center justify-center text-xs text-gray-600 border-r px-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As CSV</div>
                  </button>

                  {/* JPG */}
                  <button className="flex items-center justify-center text-xs text-gray-600 pl-2 cursor-pointer hover:text-black">
                    <File size={14} strokeWidth={2} />
                    <div className="ml-2">Export As JPG</div>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white text-sm">
                {/* Serial */}
                <div className="col-span-1">Txn Id</div>

                {/* User Name */}
                <div className="col-span-2">Username</div>

                {/* Book Title */}
                <div className="col-span-2">Book Title</div>

                {/* Author*/}
                <div className="col-span-2">Author</div>

                {/* Payment Mehtod */}
                <div className="col-span-2">Payment</div>

                {/* Status */}
                <div className="col-span-2">Status</div>

                {/* Date */}
                <div className="col-span-1">Date</div>
              </div>

              {/* Table Content */}
              {tableData.slice(0, 5).map((item) => {
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

                    {/* User Name */}
                    <div className="col-span-2">{item.username}</div>

                    {/* Book Title */}
                    <div className="col-span-2">{item.bookTitle}</div>

                    {/* Author*/}
                    <div className="col-span-2">{item.author}</div>

                    {/* Payment Mehtod */}
                    <div className="col-span-2">{item.paymentMethod}</div>

                    {/* Status */}
                    <div className="col-span-2">{item.status}</div>

                    {/* Date */}
                    <div className="col-span-1">{item.date}</div>
                  </div>
                );
              })}
            </DialogContent>
          </Dialog>
        </div>

        {/* Table Heading */}
        <div className="grid grid-cols-12 bg-accent h-12 items-center px-5 rounded-t-2xl font-semibold text-white">
          {/* Serial */}
          <div className="col-span-1">Txn Id</div>

          {/* User Name */}
          <div className="col-span-2">Username</div>

          {/* Book Title */}
          <div className="col-span-2">Book Title</div>

          {/* Author*/}
          <div className="col-span-2">Author</div>

          {/* Payment Mehtod */}
          <div className="col-span-2">Payment</div>

          {/* Status */}
          <div className="col-span-2">Status</div>

          {/* Date */}
          <div className="col-span-1">Date</div>
        </div>

        {/* Table Content */}
        {tableData.slice(0, 3).map((item) => {
          return (
            <div
              className={`grid grid-cols-12 h-12 items-center px-5 text-gray-600 text-sm ${
                tableData.indexOf(item) % 2 === 0 ? "bg-gray-50" : ""
              }`}
              key={tableData.indexOf(item)}
            >
              {/* Serial */}
              <div className="col-span-1">{tableData.indexOf(item) + 1}</div>

              {/* User Name */}
              <div className="col-span-2">{item.username}</div>

              {/* Book Title */}
              <div className="col-span-2">{item.bookTitle}</div>

              {/* Author*/}
              <div className="col-span-2">{item.author}</div>

              {/* Payment Mehtod */}
              <div className="col-span-2">{item.paymentMethod}</div>

              {/* Status */}
              <div className="col-span-2">{item.status}</div>

              {/* Date */}
              <div className="col-span-1">{item.date}</div>
            </div>
          );
        })}
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default Page;
