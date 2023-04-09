import { useSubmit } from "@remix-run/react";

export default function SocialMediaAuth() {
  const submit = useSubmit();
  return (
    <div className="flex justify-between">
      {["Discord", "Google", "Github", "LinkedIn"].map((item) => {
        return (
          <button
            key={item}
            onClick={async (event: any) => {
              event.preventDefault();
              submit(event.currentTarget, {
                method: "POST",
                replace: true,
                action: "/signup?login=" + item.toLowerCase(),
              });
            }}
            className="cursor-pointer"
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
