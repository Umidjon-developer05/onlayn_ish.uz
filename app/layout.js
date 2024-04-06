"use client";
import AuthProvider from "./_component/AuthProvider/AuthProvider";
import { ThemeProvider } from "./components/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import Navbar1 from "./_component/Navbar1";
import { Toaster } from "react-hot-toast";
import Telegram from "./_component/Telegram";
import "./globals.css";
import GlobalState from "./context/context";
function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <div className="max-w-10xl  mx-auto ">
                <Providers>
                  <div>
                    <Toaster position="top-center" />
                    <GlobalState>
                      <Navbar1 />
                      {children}
                    </GlobalState>
                    <Telegram />
                  </div>
                </Providers>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
export default RootLayout;
