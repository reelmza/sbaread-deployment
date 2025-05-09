import React from "react";
// import { GoogleMapsEmbed } from "@next/third-parties/google";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const Page = () => {
  return (
    <div className="relative w-full h-full px-10">
      <div className="absolute top-10 left-20 h-[60%] w-3/10 bg-white shadow-lg rounded-md p-5">
        {/* Heading */}
        <div className="flex items-center justify-between gap-5">
          <Image
            src={"/scooter.png"}
            alt="Scooter Image"
            height={97}
            width={90}
          />

          <div>
            <div className="text-sm font-semibold">Currently At</div>
            <div className="text-xs mb-2">
              Plot 1019 Gimbiya Street, Area 11, Garki FCT.
            </div>

            <button className="h-5 w-full text-xs bg-accent rounded flex items-center justify-center text-white">
              15km delivery - In 20 Min
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 my-5"></div>

        {/* Tracking Heading */}
        <div className="text-sm mb-5">
          <div className="text-accent font-semibold">Tracking Number</div>
          <div className="font-semibold">TN-109937934023</div>
        </div>

        {/* Progress Checks */}
        <div>
          <div className="flex items-center mb-2">
            <CheckCircle2
              size={20}
              strokeWidth={3}
              className="fill-emerald-600 text-white"
            />
            <div className="ml-2 h-[1px] w-3 bg-gray-400 mr-5"></div>
            <div className="text-sm font-semibold">Order Placed</div>
          </div>

          <div className="flex items-center mb-2">
            <CheckCircle2
              size={20}
              strokeWidth={3}
              className="fill-emerald-600 text-white"
            />
            <div className="ml-2 h-[1px] w-3 bg-gray-400 mr-5"></div>
            <div className="text-sm font-semibold">Pending Confirmation</div>
          </div>

          <div className="flex items-center mb-2">
            <CheckCircle2
              size={20}
              strokeWidth={3}
              className="fill-emerald-600 text-white"
            />
            <div className="ml-2 h-[1px] w-3 bg-gray-400 mr-5"></div>
            <div className="text-sm font-semibold">Waiting to be shipped</div>
          </div>

          <div className="flex items-center mb-2">
            <CheckCircle2
              size={20}
              strokeWidth={3}
              className="fill-emerald-600 text-white"
            />
            <div className="ml-2 h-[1px] w-3 bg-gray-400 mr-5"></div>
            <div className="text-sm font-semibold">Shipped</div>
          </div>

          <div className="flex items-center">
            <div className="h-[14px] w-[14px] ml-[3px] rounded-full bg-emerald-600 flex items-center justify-center">
              <div className="h-[5px] w-[5px] bg-white rounded-full"></div>
            </div>
            <div className="ml-2 h-[1px] w-3 bg-gray-400 mr-5"></div>
            <div className="text-sm font-semibold">Delivered</div>
          </div>
        </div>
      </div>
      <div className="h-8/10 w-full bg-accent-light flex items-center justify-center">
        Maps Goes Here
      </div>
    </div>
  );
};

export default Page;
