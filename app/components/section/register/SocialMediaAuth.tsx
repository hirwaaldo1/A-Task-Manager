import { useLocation, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function SocialMediaAuth() {
  const { supabase, ENV }: any = useOutletContext();
  const location = useLocation();

  const [hasError, setHasError] = useState<any>(
    new URLSearchParams(location.search).get("error_description")
  );
  async function signInWithPlatform(
    provider: "github" | "google" | "discord" | "linkedin"
  ) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${ENV.APP_URL}/success`,
      },
    });
    if (error) {
      throw error.message;
    }
    return null;
  }
  return (
    <>
      <div className="flex justify-between">
        {["Discord", "Google", "Github", "Linkedin"].map((item: any) => {
          return (
            <button
              key={item}
              onClick={(e) => {
                e.preventDefault();
                signInWithPlatform(item.toLowerCase());
              }}
              className="cursor-pointer"
            >
              {item}
            </button>
          );
        })}
      </div>
      {hasError && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setHasError(undefined)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="max-w-sm bg-white p-10 rounded-sm text-red-500 text-center"
          >
            <div className="flex justify-center items-center w-12 h-12 bg-red-600 text-white rounded-full  m-auto">
              <FiX size={30} />
            </div>
            <p className="text-2xl mt-3 text-red-600 font-medium">Oops,</p>
            <p className="text-gray-400 mt-3 text-base">{hasError}</p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mt-3"
              onClick={() => setHasError(undefined)}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
