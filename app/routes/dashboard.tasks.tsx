import { useOutletContext } from "@remix-run/react";
import { FiHome } from "react-icons/fi";
import Empty from "~/components/error/Empty";
import TaskCard from "~/components/ui/TaskCard";

export default function Tasks() {
  const { allTask }: any = useOutletContext();
  const tasks = allTask.filter((task: any) => task.inProgress === true);
  return (
    <div className="bg-[#1c1c1c] text-white w-[80%] py-10 px-12 relative">
      <div className="flex items-center gap-2 mb-5">
        <FiHome size={20} color="#788cde" />
        <span className="text-[#788cde] text-2xl font-semibold">Tasks</span>
      </div>
      {tasks.length === 0 ? (
        <Empty />
      ) : (
        <div className="overflow-auto">
          <div className="flex flex-col gap-1 w-full">
            {tasks.map((task: any) => {
              return <TaskCard key={task.id} task={task} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
