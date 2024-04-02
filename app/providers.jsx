"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export function Providers({ children }) {
  const session = useSession();
  if (session?.status === "loading") {
    return (
      <div className="flex bg-slate-600 items-center justify-center h-screen ">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }
  return <NextUIProvider>{children}</NextUIProvider>;
}
