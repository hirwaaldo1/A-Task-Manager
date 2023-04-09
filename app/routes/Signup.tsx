import type { V2_MetaFunction } from "@remix-run/react";
import { Link, Form, useActionData, useNavigation } from "@remix-run/react";
import About from "~/components/section/About";
import { signInWithPlatform, signUpWithEmail } from "~/utils/api";
import { useEffect, useState } from "react";
import SocialMediaAuth from "~/components/section/register/SocialMediaAuth";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Todo - Signup" }];
};
export async function action({ request }: { request: Request }) {
  const pathname: any = new URL(request.url).searchParams.get("login");
  if (pathname) {
    const response = await signInWithPlatform(pathname);
    return response;
  }
  const fromData = await request.formData();
  const name: any = fromData.get("name");
  const email: any = fromData.get("email");
  const password: any = fromData.get("password");
  const response = await signUpWithEmail(name, email, password);
  return response;
}
export default function Signup() {
  const error = useActionData();
  const { state } = useNavigation();

  const [isError, setIsError] = useState<string | undefined>();
  useEffect(() => {
    setIsError(error);
  }, [error]);
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
            {error && <p className="text-sm text-red-500 pt-8">*{error}</p>}
            <Form
              method="POST"
              className={`flex flex-col gap-6 ${error ? "mt-3" : "mt-10"}`}
            >
              <input
                type="text"
                name="name"
                onFocus={() => setIsError(undefined)}
                placeholder="Name"
                className={`outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] focus:border-black placeholder:text-sm ${
                  isError ? "border-red-500" : "border-transparent"
                }`}
              />
              <input
                type="text"
                name="email"
                onFocus={() => setIsError(undefined)}
                placeholder="Email"
                className={`outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] focus:border-black placeholder:text-sm ${
                  isError ? "border-red-500" : "border-transparent"
                }`}
              />
              <input
                name="password"
                type="password"
                onFocus={() => setIsError(undefined)}
                placeholder="Password"
                className={`outline-none rounded-md bg-white px-4 py-3.5 w-full border-l-[3px] focus:border-black placeholder:text-sm ${
                  isError ? "border-red-500" : "border-transparent"
                }`}
              />

              <div className="flex gap-2 w-11/12 mx-auto mt-4">
                <Link to="/" className="w-full">
                  <button className="bg-transparent border-2 border-[#1e1e1e] text-[#1e1e1e] px-4 rounded-md w-full text-sm py-2.5">
                    Login
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className={` text-white px-4 rounded-md w-full text-sm py-2.5
                   ${
                     state === "idle"
                       ? "bg-[#1e1e1e]"
                       : "bg-gray-400 cursor-wait"
                   }
                  `}
                >
                  Signup
                </button>
              </div>

              <p className="text-center text-sm mt-14">Or signup with</p>
              <SocialMediaAuth />
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
