import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./_component/AuthProvider/AuthProvider";
import { ThemeProvider } from "./components/ThemeContext";
import { Providers } from "./providers";
import Navbar1 from "./_component/Navbar1";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="max-w-10xl  mx-auto h-screen ">
              <Providers>
                <Navbar1 />
                <div className="mt-4 lg:mt-8">{children}</div>
              </Providers>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
export default RootLayout;
