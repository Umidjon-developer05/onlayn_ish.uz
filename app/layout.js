"use client";
import AuthProvider from "./_component/AuthProvider/AuthProvider";
import { ThemeProvider } from "./components/ThemeContext";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import Navbar1 from "./_component/Navbar1";
import Telegram from "./_component/Telegram";
import "./globals.css";
import GlobalState from "./context/context";
import "@uploadthing/react/styles.css";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
    <link
        rel="icon"
        href="/logo.png"
        type="image/x-icon"
      />
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
                  <Navbar1/>
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
  );
}
export default RootLayout;
