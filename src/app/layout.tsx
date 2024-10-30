"use client"
import { store } from "@/store";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import "./globals.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body
            className={` ${montserrat.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
