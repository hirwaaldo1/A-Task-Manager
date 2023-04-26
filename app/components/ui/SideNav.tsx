import { useState } from "react";
import { FiDelete, FiLoader, FiPlus, FiSave, FiX } from "react-icons/fi";
import SideNavTask from "./SideNavTask";

export default function SideNav({
  navBarTask,
  setNavBarTask,
  supabase,
  setAllTask,
}: any) {
  const [note, setNote] = useState(navBarTask.note);
  const [step, setStep] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [loadingNote, setLoadingNote] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  let allSteps = navBarTask.steps || [];
  async function submitStep() {
    if (loading) return;
    if (step === "" || step.trim() === "") {
      setError("Task can not be empty");
      return;
    }
    setLoading(true);
    let newStep = {
      id: Math.random().toString(36).substr(2, 9),
      step: step,
      isProgress: true,
    };
    allSteps.push(newStep);
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
    setLoading(false);
    setStep("");
  }
  async function submitDescription() {
    if (loadingNote) return;
    setLoadingNote(true);
    const { error } = await supabase
      .from("tasks")
      .update({ note: note })
      .eq("id", navBarTask.id)
      .select();
    if (error) {
      throw error.message;
    }
    setAllTask((prev: any) => {
      return prev.map((task: any) => {
        if (navBarTask.id === task.id) {
          return { ...task, note: note };
        }
        return task;
      });
    });
    setLoadingNote(false);
  }
  async function deleteStep(id: string) {
    if (loadingDelete) return;
    setLoadingDelete(true);
    let allSteps = navBarTask.steps.filter((step: any) => step.id !== id);
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
    setNavBarTask((prev: any) => {
      return { ...prev, steps: allSteps };
    });
    setLoadingDelete(false);
  }
  return (
    <div className="absolute left-0 top-0 w-full h-full flex z-50">
      <div className="flex-1" onClick={() => setNavBarTask(undefined)}></div>
      <div
        className=" bg-[#2d2d2d] w-[350px] px-4 py-6 text-white h-full shadow-lg overflow-auto"
        id="bg-img"
      >
        <div className="flex w-full justify-end mb-4">
          <FiX
            size={25}
            className="cursor-pointer"
            onClick={() => setNavBarTask(undefined)}
          />
        </div>
        <div
          className="bg-[#353535] py-4 px-2 rounded-sm border border-[#232323c0] mb-4 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.20)] max-h-[500px] overflow-auto"
          id="bg-img"
        >
          <div className="flex items-center gap-3 px-1.5">
            <p className="flex-1 text-sm">{navBarTask.task_name}</p>
            {loadingDelete && <FiLoader size={16} />}
          </div>
          {navBarTask.steps &&
            navBarTask.steps.map((value: any) => {
              return (
                <div
                  key={value.id}
                  className="flex items-center gap-3  mt-3 bg-[#434343] rounded-sm mb-2 py-3 px-2"
                >
                  <SideNavTask
                    value={value}
                    navBarTask={navBarTask}
                    supabase={supabase}
                    allSteps={allSteps}
                    setAllTask={setAllTask}
                  />
                  <p className="flex-1 text-[13px] text-[#9296a1]">
                    {value.step}
                  </p>
                  <FiDelete
                    onClick={() => deleteStep(value.id)}
                    size={16}
                    className="cursor-pointer"
                  />
                </div>
              );
            })}

          <div className="flex items-center gap-3  mt-3 bg-[#434343] rounded-sm mb-2 py-3 px-2 relative">
            <div>
              <FiPlus size={16} />
            </div>
            <form
              className="flex-1"
              onSubmit={(e) => {
                e.preventDefault();
                submitStep();
              }}
            >
              <input
                type="text"
                autoFocus
                onChange={(e) => {
                  if (error) setError(undefined);
                  setStep(e.target.value);
                }}
                value={step}
                placeholder="Next step"
                className="outline-none border-none bg-transparent text-[13px] text-[#dedede]"
              />
            </form>

            {step && step !== " " && step.trim() !== "" ? (
              loading ? (
                <FiLoader className="animate-spin" size={16} />
              ) : (
                <FiSave
                  onClick={submitStep}
                  className="cursor-pointer"
                  size={16}
                />
              )
            ) : null}
            {error && (
              <span className="text-xs text-white bg-red-600 rounded-sm absolute p-1 -top-7 right-0">
                {error}
              </span>
            )}
          </div>
        </div>
        <textarea
          className="outline-none w-full p-3 bg-[#434343] rounded-sm text-[13px] text-[#dedede] border-[#232323c0] h-[200px] border"
          onChange={(e) => setNote(e.target.value)}
          value={note || ""}
          placeholder="Add note"
        ></textarea>
        {note && note !== " " && note.trim() !== "" ? (
          <div className="flex w-full justify-end">
            <button
              disabled={loadingNote}
              className={`text-sm bg-[#434343] px-4 py-2 rounded-sm active:shadow-inner ${
                loadingNote
                  ? "cursor-not-allowed bg-[#181818] "
                  : "cursor-pointer"
              }`}
              onClick={submitDescription}
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
