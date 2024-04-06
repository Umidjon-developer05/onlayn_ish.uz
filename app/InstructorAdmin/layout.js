"use client";

import React from "react";
import { ThemeProvider } from "../components/ThemeContext";
import { SessionProvider } from "next-auth/react";
import Saidbar from "./_components/Saidbar";
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
          <div>
            <Saidbar />
            {children}
          </div>
        </SessionProvider>
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
