import {
  FiCircle,
  FiCheckCircle,
  FiStar,
  FiTrash,
  FiLoader,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Virtual } from "swiper";
import { useOutletContext } from "@remix-run/react";

export default function TaskCard({ task, onTouchStart, onMouseDown }: any) {
  SwiperCore.use([Mousewheel, Virtual]);
  const { supabase, setAllTask, setNavBarTask, soundPlay }: any =
    useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  async function handleIsCompleted(id: string, e: any) {
    e.stopPropagation();
    setIsLoadingComplete(true);
    const { error } = await supabase
      .from("tasks")
      .update({ inProgress: !task.inProgress })
      .eq("id", task.id);
    if (error) {
      throw error.message;
    }
    if (task.inProgress) soundPlay();
    setAllTask((prev: any) => {
      return prev.map((task: any) => {
        if (id === task.id) {
          return { ...task, inProgress: !task.inProgress };
        }
        return task;
      });
    });
    setIsLoadingComplete(false);
  }
  async function handleIsImportant(id: string, e: any) {
    e.stopPropagation();
    setIsLoading(true);
    const { error } = await supabase
      .from("tasks")
      .update({ isImportance: !task.isImportance })
      .eq("id", task.id);
    if (error) {
      throw error.message;
    }
    setAllTask((prev: any) => {
      return prev.map((task: any) => {
        if (id === task.id) {
          return { ...task, isImportance: !task.isImportance };
        }
        return task;
      });
    });
    setIsLoading(false);
  }
  async function handleDeleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (error) {
      throw error.message;
    }
    setAllTask((prev: any) => {
      return prev.filter((task: any) => task.id !== id);
    });
  }

  return (
    <div className="relative overflow-hidden ">
      <span
        className="w-10 h-full  rounded absolute -left-4 z-50 flex items-center justify-end"
        onTouchStart={(e: any) => {
          console.log("touchStart");
          e.preventDefault();
          e.target.style.backgroundColor = "blue";
          document.body.style.overflow = "hidden";
          onTouchStart(e);
        }}
        onMouseDown={(e: any) => {
          console.log("mouseDown");
          document.body.style.overflow = "hidden";
          onMouseDown(e);
        }}
        onTouchEnd={(e: any) => {
          console.log("end");
          e.target.style.backgroundColor = "black";
          document.body.style.overflow = "visible";
        }}
        onMouseUp={() => {
          console.log("up");
          document.body.style.overflow = "visible";
        }}
      >
        <FiMenu className="text-[#6d6d6d]" size={20} />
      </span>
      <Swiper
        className="w-full"
        direction={"horizontal"}
        mousewheel={{
          forceToAxis: true,
          sensitivity: -10,
          thresholdDelta: 14,
        }}
        onSlideChange={(sliler) => {
          if (sliler.isEnd) handleDeleteTask(task.id);
        }}
      >
        <SwiperSlide>
          <div
            className="flex justify-between bg-[#2d2d2d] p-2 rounded hover:bg-[#353535] cursor-pointer transition-all delay-[30ms] active:bg-[#353535]"
            onClick={() => setNavBarTask(task)}
          >
            <div className="flex gap-2 text-[#e2e2e2] pl-6">
              {isLoadingComplete ? (
                <div className="mt-1">
                  <FiLoader className="animate-spin" size={20} />
                </div>
              ) : (
                <div
                  className="mt-1"
                  onClick={(e) => handleIsCompleted(task.id, e)}
                >
                  {!task.inProgress ? (
                    <FiCheckCircle size={20} />
                  ) : (
                    <FiCircle size={20} />
                  )}
                </div>
              )}
              <div className="flex flex-col text-sm">
                <span
                  className={task.inProgress === false ? "line-through" : ""}
                >
                  {task.task_name}
                </span>
                {task.steps.length !== 0 ? (
                  <span className="text-xs">
                    Task {task.steps.filter((v: any) => !v.isProgress).length}{" "}
                    of {task.steps.length}
                  </span>
                ) : (
                  <span className="text-xs">No steps</span>
                )}
              </div>
            </div>
            <div className="mt-1">
              {isLoading ? (
                <FiLoader className="animate-spin" size={18} />
              ) : (
                <FiStar
                  className={`${
                    task.isImportance && "fill-[#7589d9] text-[#7589d9]"
                  }`}
                  size={18}
                  onClick={(e) => handleIsImportant(task.id, e)}
                />
              )}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-between items-center w-full rounded-sm bg-[#ff5252] relative">
            <div className="text-center flex items-center gap-3 p-[14px]">
              <FiTrash />
              <span className="font-medium">Delete</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
