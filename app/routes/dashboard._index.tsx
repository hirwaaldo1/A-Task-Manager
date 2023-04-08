import { FiHome, FiCircle } from "react-icons/fi";
import TaskCard from "~/components/ui/TaskCard";

export default function Homes() {
  return (
    <div className="bg-[#1c1c1c] text-white w-[80%] py-10 px-12 relative">
      <div className="flex items-center gap-2 mb-5">
        <FiHome size={20} color="#788cde" />
        <span className="text-[#788cde] text-2xl font-semibold">Tasks</span>
      </div>
      {/* <Empty /> */}
      <div className="overflow-auto">
        <div className="flex flex-col gap-1 w-full">
          {Array(4)
            .fill("")
            .map((_, index) => {
              return <TaskCard key={index} />;
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
