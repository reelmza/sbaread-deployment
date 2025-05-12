"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronDown, User2Icon } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  return (
    <div className="px-10">
      {/* Toggler */}
      <div className="flex items-center p-3 rounded-full bg-neutral-100 w-fit gap-2 cursor-pointer mb-10">
        <button
          className={`h-10 w-28 rounded-full cursor-pointer ${
            currentScreen == 0 ? "bg-white" : ""
          }`}
          onClick={() => setCurrentScreen(0)}
        >
          Profile
        </button>
        <button
          className={`h-10 w-28 rounded-full cursor-pointer ${
            currentScreen === 1 ? "bg-white" : ""
          }`}
          onClick={() => setCurrentScreen(1)}
        >
          Notifications
        </button>
      </div>
      {/* Personalize */}
      {currentScreen == 0 ? (
        <div>
          {/* Heading */}
          <div className="text-gray-600 border-b w-full font-semibold pb-5 mb-10">
            Personalize
          </div>

          {/* Form */}
          <form className="flex gap-14 mb-20">
            {/* Profile Pic */}
            <div className="h-[9rem] w-[9rem] bg-accent-light rounded-full flex items-center justify-center">
              <User2Icon
                size={68}
                strokeWidth={0}
                className="fill-neutral-600"
              />
            </div>

            <div>
              {/* First Name */}
              <div className="flex items-center gap-4 text-sm mb-5">
                <label htmlFor="" className="w-[6rem]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Jesse Moses"
                  className="bg-gray-100 h-10 px-4 rounded"
                />
              </div>

              {/* Last Name */}
              <div className="flex items-center gap-4 text-sm mb-5">
                <label htmlFor="" className="w-[6rem]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Jesse Moses"
                  className="bg-gray-100 h-10 px-4 rounded"
                />
              </div>

              {/* Email Address */}
              <div className="flex items-center gap-4 text-sm">
                <label htmlFor="" className="w-[6rem]">
                  Email
                </label>
                <div className="text-gray-600">jessemoses71@gmail.com</div>
              </div>
            </div>
          </form>

          {/* Update Password */}
          <div className="text-gray-600 border-b w-full font-semibold pb-5 mb-10">
            Change Password
          </div>

          <div className="flex gap-10">
            <div>
              <div className="font-semibold">Update Password</div>
              <div className="text-gray-600 text-sm">
                Change your password to a new one
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button className="leading-0 h-5 text-accent cursor-pointer">
                  Change Password
                </button>
              </DialogTrigger>
              <DialogContent>
                <VisuallyHidden>
                  <DialogHeader>
                    <DialogTitle>Transaction History</DialogTitle>
                  </DialogHeader>
                </VisuallyHidden>

                <form className="flex flex-col">
                  <label htmlFor="" className="mb-2">
                    Old Password
                  </label>
                  <input
                    type="text"
                    className="h-10 bg-gray-100 px-4 rounded-md block mb-2"
                  />

                  <label htmlFor="" className="mb-2">
                    New Password
                  </label>
                  <input
                    type="text"
                    className="h-10 bg-gray-100 px-4 rounded-md block mb-5"
                  />

                  <button className="h-10 bg-accent text-white rounded px-5 w-fit text-sm font-semibold">
                    Update Password
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="h-32"></div>
        </div>
      ) : (
        ""
      )}
      {currentScreen == 1 ? (
        <div>
          {/* Email notifications */}
          <div className="w-full flex gap-20 mb-10">
            <div className="w-[40%] flex gap-5 mb-10">
              {/* Toggler */}
              <div className="shrink-0">
                <Switch className="data-[state=checked]:bg-orange-500" />
              </div>

              {/* Details */}
              <div>
                <div className="font-semibold leading-none mb-1">
                  Email Notifications
                </div>
                <div className="text-sm text-gray-600">
                  Get notifications via email when youre offline.
                </div>
              </div>
            </div>

            {/* Notification setting content */}
            <div className="w-[70%]">
              {/* News and Update */}
              <div className="w-full flex mb-10">
                {/* Toggler */}
                <div className="shrink-0 mr-5">
                  <Switch />
                </div>

                {/* Text content */}
                <div className="grow mr-28">
                  <div className="font-semibold text-sm leading-none mb-1">
                    News and Updates
                  </div>
                  <p className="text-sm text-gray-600">
                    News about product and feature updates
                  </p>
                </div>

                {/* Suggeted button */}
                <button className="flex items-center justify-center gap-2 shrink-0 w-32 h-10 border border-gray-600 rounded-sm">
                  <span className="text-sm">Suggested</span>
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Reminders */}
              <div className="w-full bg-red-1s00 flex">
                {/* Toggler */}
                <div className="shrink-0 mr-5">
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>

                {/* Text content */}
                <div className="grow mr-28">
                  <div className="font-semibold text-sm leading-none mb-1">
                    Reminders
                  </div>
                  <p className="text-sm text-gray-600">
                    These are notifications to remind you of updates you might
                    has missed.
                  </p>
                </div>

                {/* Suggeted button */}
                <button className="flex items-center justify-center gap-2 shrink-0 w-32 h-10 border border-gray-600 rounded-sm">
                  <span className="text-sm">Suggested</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Push notifications */}
          <div className="w-full flex gap-20">
            {/* Notification setting title */}
            <div className="w-[40%] flex gap-5">
              <div className="shrink-0">
                <Switch
                  // checked={togglerState[1]}
                  // onCheckedChange={() =>
                  //   updatePrefferences(
                  //     "push",
                  //     togglerState[1] === false ? true : false
                  //   )
                  // }
                  // disabled={loading !== null}
                  className="data-[state=checked]:bg-orange-500"
                />
              </div>
              {/* Details */}
              <div>
                <div className="font-semibold leading-none mb-1">
                  Push Notifications
                </div>
                <div className="text-sm text-gray-600">
                  Get real time browser notifications when you are online.
                </div>
              </div>

              {/* Toggler */}
            </div>

            {/* Notification setting content */}
            <div className="w-[70%]">
              {/* News and Update */}
              <div className="w-full flex mb-10">
                {/* Toggler */}
                <div className="shrink-0 mr-5">
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>

                {/* Text content */}
                <div className="grow mr-28">
                  <div className="font-semibold text-sm leading-none mb-1">
                    News and Updates
                  </div>
                  <p className="text-sm text-gray-600">
                    News about product and feature updates
                  </p>
                </div>

                {/* Suggeted button */}
                <button className="flex items-center justify-center gap-2 shrink-0 w-32 h-10 border border-gray-600 rounded-sm">
                  <span className="text-sm">Suggested</span>
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Reminders */}
              <div className="w-full bg-red-1s00 flex">
                {/* Toggler */}
                <div className="shrink-0 mr-5">
                  <Switch />
                </div>

                {/* Text content */}
                <div className="grow mr-28">
                  <div className="font-semibold text-sm leading-none mb-1">
                    Reminders
                  </div>
                  <p className="text-sm text-gray-600">
                    These are notifications to remind you of updates you might
                    has missed.
                  </p>
                </div>

                {/* Suggeted button */}
                <button className="flex items-center justify-center gap-2 shrink-0 w-32 h-10 border border-gray-600 rounded-sm">
                  <span className="text-sm">Suggested</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
