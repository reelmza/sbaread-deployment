import { AlertTriangle, InfoIcon } from "lucide-react";
import React from "react";

const PageError = () => {
  return (
    <div className="px-10 w-full flex justify-between">
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle size={16} />
        <div className="text-sm">An error occured, please reload page</div>
      </div>
    </div>
  );
};

export default PageError;
