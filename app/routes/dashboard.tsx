import type { V2_MetaFunction } from "@remix-run/node";
import { FiSearch, FiCheckCircle, FiHome } from "react-icons/fi";
import { IoInfiniteSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { Outlet, useOutletContext, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
export const meta: V2_MetaFunction = () => {
  return [{ title: "Todo - Home" }];
};
const MenuLeft = [
  {
    type: "All",
    icon: <IoInfiniteSharp size={17} color="#788cde" />,
    count: 1,
  },
  {
    type: "Completed",
    icon: <FiCheckCircle size={17} color="#dc6865" />,
    count: 1,
  },
  {
    type: "Tasks",
    icon: <FiHome size={17} color="#788cde" />,
    count: 1,
  },
  {
    type: "Important",
    icon: <AiOutlineStar size={17} color="#f5b6c2" />,
    count: null,
  },
];

export default function Dashoard() {
  const [user, setUser] = useState<any>();
  const { supabase }: any = useOutletContext();
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    checkAuth();
  }, []);
  const navigate = useNavigate();
  if (user === undefined) return <p>Loading</p>;
  if (user === null) return navigate("/");

  return (
    <main className="max-w-screen-2xl m-auto">
      <div className="flex justify-between h-screen">
        <div className="bg-[#202020] text-white w-[380px]" id="bg-img">
          <div className="flex items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden">
              {user.user_metadata.avatar_url && (
                <img src={user.user_metadata.avatar_url} alt="user" />
              )}
            </div>
            <div className="mt-2">
              <h1 className="text-lg font-medium m-0 p-0 leading-3">
                {user.user_metadata.full_name || user.email.split("@")[0]}
              </h1>
              <span className="text-[13px] text-[#999999] m-0 p-0 leading-[4px]">
                {user.email}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center border py-1 px-2 rounded-sm border-[#363636] border-b-slate-50 mt-2 mx-4">
            <input
              type="text"
              placeholder="Search.."
              className="bg-transparent border-none outline-none placeholder:text-[#c8c8c8] text-sm"
            />
            <FiSearch />
          </div>
          <div className="flex flex-col gap-3 mt-3 p-1.5">
            {MenuLeft.map((value, index) => {
              return (
                <div
                  key={index}
                  className="px-3 hover:bg-[#323232] p-2.5 rounded-sm cursor-pointer relative group"
                >
                  <div className="absolute top-0 h-full items-center  left-0 hidden group-hover:flex">
                    <span className="w-[3px] h-3.5 bg-[#76b9ed] left-0 rounded-full block"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      {value.icon}
                      <span className="text-sm font-normal">{value.type}</span>
                    </div>
                    {value.count && (
                      <div className=" bg-[#3e3e3e] text-[10px] flex items-center justify-center rounded-full w-4 h-4 pr-[1px] pt-[1px]">
                        <span>{value.count}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
