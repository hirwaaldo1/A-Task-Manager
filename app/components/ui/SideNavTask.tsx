import { FiCheckCircle, FiCircle, FiLoader } from "react-icons/fi";
import { useState } from "react";
export default function SideNavTask({
  value,
  navBarTask,
  supabase,
  setAllTask,
}: any) {
  const [checkLoading, setCheckLoading] = useState(false);
  const [isProgress, setIsProgress] = useState(value.isProgress);
  async function handleIsProgress(id: string) {
    setCheckLoading(true);
    let allSteps = navBarTask.steps.map((step: any) => {
      if (step.id === id) {
        return { ...step, isProgress: !step.isProgress };
      }
      return step;
    });
    const { error } = await supabase
      .from("tasks")
      .update({ steps: allSteps })
      .eq("id", navBarTask.id)
      .select();
    if (error) {
      throw error.message;
    }
    setAllTask((prev: any) => {
      return prev.map((task: any) => {
        if (navBarTask.id === task.id) {
          return { ...task, steps: allSteps };
        }
        return task;
      });
    });
    setIsProgress((prev: any) => !prev);
    setCheckLoading(false);
  }
  return (
    <div>
      {checkLoading ? (
        <FiLoader className="animate-spin" size={16} />
      ) : isProgress ? (
        <FiCircle size={16} onClick={() => handleIsProgress(value.id)} />
      ) : (
        <FiCheckCircle size={16} onClick={() => handleIsProgress(value.id)} />
      )}
    </div>
  );
}
