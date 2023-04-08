import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useState } from "react";
import About from "~/components/section/About";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Todo - Login" }];
};

export default function Index() {
  const [isRemember, setIsRemember] = useState(false);
  return (
    <main className="bg-[#1e1e1e] min-h-screen text-white flex justify-between items-center">
      <div className="max-w-7xl m-auto w-full">
        <div className="grid sm:grid-cols-2 sm:gap-4 md:gap-72">
          <About />
          <div className="bg-[#f1f1f1] text-black rounded-lg py-12 px-14">
            <h3 className="font-semibold text-2xl mb-3">Login</h3>
            <h3 className="text-sm font-light">
              Welcome back, Please login to your account.
            </h3>
            <div className="flex flex-col gap-6 mt-16">
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
              <div className="flex justify-between items-center px-2">
                <div className="flex gap-4 items-center">
                  <div
                    className={`w-6 h-6 block border-2 border-black rounded-sm cursor-pointer ${
                      isRemember && "bg-black"
                    }`}
                    onClick={() => setIsRemember((prev) => !prev)}
                  ></div>
                  <span className="text-sm">Remember me</span>
                </div>
                <span className="text-sm">Forgot password</span>
              </div>
              <div className="flex gap-2 w-11/12 mx-auto mt-4">
                <Link to={"/signup"} className="w-full">
                  <button className="bg-transparent border-2 border-[#1e1e1e] text-[#1e1e1e]  rounded-md w-full text-sm py-2.5">
                    Sign up
                  </button>
                </Link>
                <Link to="" className="w-full">
                  <button className="bg-[#1e1e1e] border-[#1e1e1e] border text-white px-4 rounded-md w-full text-sm py-2.5">
                    Login
                  </button>
                </Link>
              </div>
              <p className="text-center text-sm mt-14">Or login with</p>
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
