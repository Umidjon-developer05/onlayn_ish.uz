"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export function Providers({ children }) {
  const session = useSession();
  if (session?.status === "loading") {
    return (
      <div id="page">
        <div id="container">
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div id="ring"></div>
          <div >Onlayn-ish.uz</div>
        </div>
      </div>
    );
  }
  return <NextUIProvider>{children}</NextUIProvider>;
}
