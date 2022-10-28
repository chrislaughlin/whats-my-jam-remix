import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import WindowStyles from "98.css";

import global from './global.css'

export function links() {
  return [
    { rel: "stylesheet", href: global },
    { rel: "stylesheet", href: WindowStyles }
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Whats My Jam",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
