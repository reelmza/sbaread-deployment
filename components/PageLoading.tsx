import React from "react";
import Spinner from "./Spinner";

const PageLoading = () => {
  return (
    <div className="px-10 w-full flex justify-between">
      <div className="flex items-center gap-2 text-sm">
        <Spinner className="size-4 text-gray-600" />
        <div>Loading</div>
      </div>
    </div>
  );
};

export default PageLoading;
