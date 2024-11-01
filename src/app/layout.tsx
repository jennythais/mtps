"use client"
import { store } from "@/store";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar/page";
import "./globals.css";
import { AppProvider } from '@toolpad/core/AppProvider';
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const expectedPath = ["login", "reset-password", "forgot-password"].includes(pathname.split("/")[1]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body
            className={` ${montserrat.variable} antialiased`}
          >
            {!expectedPath &&
              <Navbar />}


              {children}

          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
