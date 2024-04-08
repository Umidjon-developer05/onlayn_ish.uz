"use client";

import React from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { SessionProvider } from "next-auth/react";
import Saidbar from "./_components/Saidbar";
import { LampContainer } from "../components/ui/lamp";
const RootLayout = ({ children }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <div className="flex flex-col items-center justify-center mt-20">
              <Saidbar />
              {children}
          </div>
        </SessionProvider>
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
