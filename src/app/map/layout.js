"use client";
import Providers from "@/redux/Providers";

export default function MyMapLayout({ children }) {
  return <Providers>{children}</Providers>;
}
