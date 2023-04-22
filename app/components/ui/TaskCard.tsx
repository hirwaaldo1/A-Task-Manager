import { FiCircle, FiCheckCircle, FiStar, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Mousewheel, Virtual } from "swiper";

export default function TaskCard({ task }: { task: any }) {
  SwiperCore.use([Mousewheel, Virtual]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  return (
    <Swiper
      className="w-full"
      direction={"horizontal"}
      mousewheel={{
        forceToAxis: true,
        sensitivity: -10,
        thresholdDelta: 14,
      }}
    >
      <SwiperSlide>
        <div className="flex justify-between bg-[#2d2d2d] p-2 rounded hover:bg-[#353535] cursor-pointer">
          <div className="flex gap-2 text-[#e2e2e2]">
            <div
              className="mt-1"
              onClick={() => setIsCompleted((prev) => !prev)}
            >
              {isCompleted ? (
                <FiCheckCircle size={20} />
              ) : (
                <FiCircle size={20} />
              )}
            </div>
            <div className="flex flex-col text-sm">
              <span>{task.task_name}</span>
              <span className="text-xs">2 of 6</span>
            </div>
          </div>
          <div className="mt-1" onClick={() => setIsImportant((prev) => !prev)}>
            <FiStar
              className={`${isImportant && "fill-[#7589d9] text-[#7589d9]"}`}
              size={18}
            />
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
  );
}
