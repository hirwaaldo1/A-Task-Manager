import { useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import { useState } from "react";
export default function SocialMediaAuth() {
  const { supabase }: any = useOutletContext();
  const location = useLocation();
  const [hasError, setHasError] = useState<any>(
    new URLSearchParams(location.search).get("error_description")
  );
  const navigate = useNavigate();
  async function signInWithPlatform(
    provider: "github" | "google" | "discord" | "linkedin" | null
  ) {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    if (error) {
      throw error.message;
    }

    navigate(data.url);
  }
  return (
    <>
      <div className="flex justify-between">
        {["Discord", "Google", "Github", "Linkedin"].map((item: any) => {
          return (
            <button
              key={item}
              onClick={async (e) => {
                e.preventDefault();
                await signInWithPlatform(item.toLowerCase());
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
            onClickCapture={(e) => {
              console.log("child");
              e.stopPropagation();
            }}
            className="max-w-2xl bg-white p-10 rounded-sm text-red-500"
          >
            {hasError}
          </div>
        </div>
      )}
    </>
  );
}
