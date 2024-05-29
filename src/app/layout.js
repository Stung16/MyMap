'use client'
import { Roboto } from "next/font/google";
import "./globals.css";
import "../assets/css/style.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/redux/Providers";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/img/mymap.ico" sizes="any" />
      <body className={roboto.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
