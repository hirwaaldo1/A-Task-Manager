import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "react-router-dom";
import About from "~/components/section/About";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Todo - Signup" }];
};
export default function Signup() {
  return (
    <main
      className="bg-[#1e1e1e] min-h-screen text-white flex justify-between items-center"
      id="bg-img"
    >
      <div className="max-w-7xl m-auto p-10 w-full">
        <div className="grid sm:grid-cols-2 sm:gap-4 md:gap-72">
          <About />
          <div className="bg-[#f1f1f1] text-black rounded-lg py-12 px-14">
            <h3 className="font-semibold text-2xl mb-3">Signup</h3>
            <h3 className="text-sm font-light">
              Join us and we will help you in your darily life.
            </h3>
            <div className="flex flex-col gap-6 mt-12">
              <input
                type="text"
                placeholder="Name"
                className="outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] border-black border-opacity-0 focus:border-opacity-100 placeholder:text-sm"
              />
              <input
                type="text"
                placeholder="Email"
                className="outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] border-black border-opacity-0 focus:border-opacity-100 placeholder:text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                className="outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] border-black border-opacity-0 focus:border-opacity-100 placeholder:text-sm"
              />

              <div className="flex gap-2 w-11/12 mx-auto mt-4">
                <Link to="/" className="w-full">
                  <button className="bg-transparent border-2 border-[#1e1e1e] text-[#1e1e1e] px-4 rounded-md w-full text-sm py-2.5">
                    Login
                  </button>
                </Link>
                <button className="bg-[#1e1e1e] text-white px-4 rounded-md w-full text-sm py-2.5">
                  Signup
                </button>
              </div>
              <p className="text-center text-sm mt-14">Or signup with</p>
              <div className="flex justify-between">
                {["Facebook", "Google", "Apple", "LinkedIn"].map((item) => {
                  return (
                    <span key={item} className="cursor-pointer">
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
