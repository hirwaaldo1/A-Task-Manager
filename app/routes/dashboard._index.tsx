import { useOutletContext } from "@remix-run/react";
import { FiHome, FiCircle, FiSend, FiLoader } from "react-icons/fi";
import Empty from "~/components/error/Empty";
import TaskCard from "~/components/ui/TaskCard";
import { useState, useEffect } from "react";

export default function Homes() {
  const { allTask, supabase, userID, setAllTask }: any = useOutletContext();
  const [task, setTask] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function submitTask() {
    setLoading(true);
    if (task === "" || task.trim() === "") {
      setError("Task can not be empty");
      return;
    }
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ userId: userID, task_name: task }])
      .select();
    if (error) {
      setError(error.message);
      return;
    }
    setAllTask((prev: any) => [...prev, data[0]]);
    setLoading(false);
    setTask("");
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(undefined);
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);
  return (
    <div className="bg-[#1c1c1c] text-white w-[80%] py-10 px-12 relative">
      <div className="flex items-center gap-2 mb-5">
        <FiHome size={20} color="#788cde" />
        <span className="text-[#788cde] text-2xl font-semibold">Tasks</span>
      </div>
      {allTask.length === 0 ? (
        <Empty />
      ) : (
        <div className="overflow-auto">
          <div className="flex flex-col gap-1 w-full">
            {allTask.map((task: any) => {
              return <TaskCard key={task.id} task={task} />;
            })}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full left-0">
        <div className="my-10 mx-12 bg-[#2d2d2d] px-2 rounded flex gap-2 items-center text-[#e2e2e2] py-4 relative">
          {error && (
            <div className="absolute -top-12 left-0 bg-red-600 text-white p-2 text-sm rounded">
              <span>{error}</span>
            </div>
          )}
          <FiCircle size={20} />
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              submitTask();
            }}
          >
            <input
              placeholder="Add a task.."
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="bg-transparent border-none outline-none placeholder:text-[#c8c8c8] text-sm"
            />
          </form>
          {loading ? (
            <FiLoader className="animate-spin" size={20} />
          ) : (
            <FiSend size={20} onClick={submitTask} />
          )}
        </div>
      </div>
    </div>
  );
}
