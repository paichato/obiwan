import React from "react";
import { FiChevronLeft } from "react-icons/fi";

export const AltHeader = ({ router }) => {
  return (
    <div className="flex items-center justify-between p-10 w-12/12  md:w-7/12 xl:w-7/12 2xl:w-7/12">
      <button onClick={() => router.back()}>
        <div className="flex items-center text-[#a8a8b3]  hover:text-[#666] ">
          <FiChevronLeft className="mr-1" size={16} />
          Back
        </div>
      </button>
    </div>
  );
};
