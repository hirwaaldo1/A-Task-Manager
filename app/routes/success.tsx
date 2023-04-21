import type { V2_MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
export const meta: V2_MetaFunction = () => {
  return [{ title: "Todo - success" }];
};

export default function Success() {
  const navigate = useNavigate();
  return (
    <main
      className="bg-[#1e1e1e] min-h-screen w-full text-white flex justify-between items-center"
      id="bg-img"
    >
      <div className="max-w-lg m-auto text-center flex flex-col gap-3">
        <img
          width={150}
          height={150}
          src="/assets/mello_otq1.svg"
          id="bg-img"
          className="bg-[#222222] m-auto relative -left-9"
          alt="mello"
        />
        <h1 className="text-2xl font-medium">Thank you for logging in !!</h1>
        <p>
          You have successfully logging in to A-task. You can continue by click
          the colored bottom
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white border-2 border-[#1e1e1e] text-[#1e1e1e] px-4 rounded-md w-fit text-sm py-2.5 m-auto"
        >
          continue
        </button>
      </div>
    </main>
  );
}
