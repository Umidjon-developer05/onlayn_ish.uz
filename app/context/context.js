"use client";
import { createContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Error from "../Error/page";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const router = useRouter();
  const pathName = usePathname();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token && pathName.includes("/InstructorAdmin")) {
      router.push("/InstructorAdmin");
    }
  }, []);
  if (!token && pathName.includes("/InstructorAdmin")) {
    return <Error />;
  } else {
    return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
  }
}
