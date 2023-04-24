import { FiCircle, FiPlus, FiSave, FiX } from "react-icons/fi";

export default function SideNav({ navBarTask, setNavBarTask }: any) {
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
          className="bg-[#353535] py-4 px-2 rounded-sm border border-[#232323c0] mb-4 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.20)] max-h-[200px] overflow-auto"
          id="bg-img"
        >
          <div className="flex items-center gap-3 px-1.5">
            <p className="flex-1 text-sm">{navBarTask.task_name}</p>
          </div>
          <div className="flex items-center gap-3  mt-3 bg-[#434343] rounded-sm mb-2 py-3 px-2">
            <div>
              <FiCircle size={16} />
            </div>
            <p className="flex-1 text-[13px] text-[#9296a1]">
              react router DOM
            </p>
          </div>
          <div className="flex items-center gap-3  mt-3 bg-[#434343] rounded-sm mb-2 py-3 px-2">
            <div>
              <FiPlus size={16} />
            </div>
            <input
              type="text"
              placeholder="Next step"
              className="outline-none border-none bg-transparent flex-1 text-[13px] text-[#dedede]"
            />
            <FiSave className="cursor-pointer" size={16} />
          </div>
        </div>
        <textarea
          className="outline-none bg-[#434343] rounded-sm w-full p-3 text-[13px] text-[#dedede] border-[#232323c0] h-[200px] border"
          placeholder="Add note"
        ></textarea>
        <div className="flex w-full justify-end">
          <button className="text-sm bg-[#434343] px-4 py-2 rounded-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
