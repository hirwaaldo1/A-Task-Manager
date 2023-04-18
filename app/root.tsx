import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import stylesheet from "./style/index.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { ErrorBoundary } from "./ErrorBoundary";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export async function loader() {
  return json({
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      SUPABASE_JWT_KEY: process.env.SUPABASE_JWT_KEY,
    },
  });
}
export default function App() {
  const env = useLoaderData();
  const supabase = createBrowserClient(
    env.ENV.SUPABASE_URL,
    env.ENV.SUPABASE_ANON_KEY
  );
  const values = {
    supabase,
    env,
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorBoundary />
        <Outlet context={values} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
      </body>
    </html>
  );
}
