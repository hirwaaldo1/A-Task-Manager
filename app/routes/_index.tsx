import type { V2_MetaFunction } from "@remix-run/react";
import { Link, Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import About from "~/components/section/About";
import SocialMediaAuth from "~/components/section/register/SocialMediaAuth";
import { signInWithEmail } from "~/utils/api";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Todo - Login" }];
};

export async function action({ request }: { request: Request }) {
  const fromData = await request.formData();
  const email: any = fromData.get("email");
  const password: any = fromData.get("password");
  const response = await signInWithEmail(email, password);
  return response;
}

export default function Index() {
  const error = useActionData();
  const { state } = useNavigation();
  const [isError, setIsError] = useState<string | undefined>();
  useEffect(() => {
    setIsError(error);
  }, [error]);
  const [isRemember, setIsRemember] = useState(false);
  return (
    <main
      className="bg-[#1e1e1e] min-h-screen text-white flex justify-between items-center"
      id="bg-img"
    >
      <div className="max-w-7xl p-10 m-auto w-full">
        <div className="grid sm:grid-cols-2 sm:gap-4 md:gap-72">
          <About />
          <div className="bg-[#f1f1f1] text-black rounded-lg py-12 px-14">
            <h3 className="font-semibold text-2xl mb-1">Login</h3>
            <h3 className="text-sm font-light">
              Welcome back, Please login to your account.
            </h3>
            {error && <p className="text-sm text-red-500 pt-8">*{error}</p>}
            <Form
              className={`flex flex-col gap-6 ${error ? "mt-3" : "mt-16"}`}
              method="POST"
            >
              <input
                name="email"
                type="text"
                placeholder="Email"
                onFocus={() => setIsError(undefined)}
                className={`outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] focus:border-black placeholder:text-sm ${
                  isError ? "border-red-500" : "border-transparent"
                }`}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onFocus={() => setIsError(undefined)}
                className={`outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] focus:border-black placeholder:text-sm ${
                  isError ? "border-red-500" : "border-transparent"
                }`}
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
                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className={`border text-white px-4 rounded-md w-full text-sm py-2.5 
                  ${
                    state === "idle"
                      ? "bg-[#1e1e1e] border-[#1e1e1e]"
                      : "bg-gray-400 cursor-wait"
                  }
                  `}
                >
                  {state === "idle" ? "Login" : "Wait..."}
                </button>
              </div>
              <p className="text-center text-sm mt-14">Or login with</p>
              <SocialMediaAuth />
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
