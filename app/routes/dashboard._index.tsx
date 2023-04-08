import { FiHome, FiCircle } from "react-icons/fi";

import { AiOutlineStar } from "react-icons/ai";
export default function Homes() {
  return (
    <div className="bg-[#1c1c1c] text-white w-full py-10 px-12 relative">
      <div className="flex items-center gap-2 mb-5">
        <FiHome size={20} color="#788cde" />
        <span className="text-[#788cde] text-2xl font-semibold">Tasks</span>
      </div>
      <div className="overflow-auto">
        <div className="flex flex-col gap-1">
          {Array(4)
            .fill("")
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between bg-[#2d2d2d] p-2 rounded hover:bg-[#353535] cursor-pointer"
                >
                  <div className="flex gap-2 text-[#e2e2e2]">
                    <FiCircle className="mt-1" size={20} />
                    <div className="flex flex-col text-sm">
                      <span>adding redux in the blog project</span>
                      <span className="text-xs">2 of 6</span>
                    </div>
                  </div>
                  <AiOutlineStar className="mt-1" size={20} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="absolute bottom-0 w-full left-0">
        <div className="my-10 mx-12 bg-[#2d2d2d] px-2 rounded flex gap-2 items-center text-[#e2e2e2] py-4">
          <FiCircle size={20} />
          <input
            placeholder="Add a task.."
            className="bg-transparent border-none outline-none placeholder:text-[#c8c8c8] text-sm"
          />
        </div>
      </div>
    </div>
  );
}
