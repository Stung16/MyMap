import LogoIconHome from "@/assets/icons/LogoIconHome";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mindmap - Collaborative Mind Mapping | Mindmap",
  description: "The Ultimate Toolkit for Bringing Ideas to Life",
  openGraph: {
    title: "Mindmap - Collaborative Mind Mapping | Mindmap",
    description: "The Ultimate Toolkit for Bringing Ideas to Life",
  },
};

export default async function AuthLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const res = await fetch(`${process.env.SERVER_API}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  if (res?.status === 200) {
    redirect("/");
  }
  return (
    <div>
      <div className="auth">
        <Link href={"/"} className="h-[45.5px]">
          <LogoIconHome className="w-[120px] ml-6 mt-6" />
        </Link>
        {children}
        <Toaster />
      </div>
    </div>
  );
}
