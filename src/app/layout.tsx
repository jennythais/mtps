"use client";

import { store } from "@/store";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar/page";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

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
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              {!expectedPath ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "25%", position: 'fixed' }}>
                    <Navbar />
                  </div>
                  <div style={{ marginLeft: '25%', width: "75%" }}>{children}</div>
                </div>
              ) : (
                children
              )}
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
