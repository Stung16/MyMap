"use client";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import LogoIconHome from "@/assets/icons/LogoIconHome";
import Cookies from "js-cookie";
import { handleLogout } from "@/services/auth.service";
import { fetcher } from "@/utils/fn";
import useSWR from "swr";
import Loading from "@/components/mymap/Loading/Loading";
const Header = () => {
  const pathname = usePathname();
  const { data, isLoading } = useSWR(`/api/auth/profile`, fetcher);
  if (isLoading) {
    return <Loading />;
  }
  const handleLogOUT = async () => {
    // if (profiles) {
    await handleLogout();
    // }
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/";
  };
  return (
    <div>
      <header
        className={` fixed top-0 w-full z-20 header bg-[#fff h-[80px] max-h-[80-px]`}
      >
        <div className="flex items-center justify-between px-8 py-3 mx-auto">
          <Link href={"/"} className="logo">
            <LogoIconHome className="w-[120px]" />
          </Link>
          <nav className="flex items-center gap-6 px-[10px] py-2 rounded-full bg-blue1 backdrop-blur-md nav_header">
            <Link
              href={"/"}
              className={
                pathname == "/"
                  ? "active"
                  : "px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]"
              }
            >
              Home
            </Link>
            <Link
              href={"/features"}
              className={
                pathname == "/features"
                  ? "active"
                  : "px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]"
              }
            >
              Features
            </Link>
            <Link
              href={"/contact"}
              className={
                pathname == "/contact"
                  ? "active"
                  : "px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]"
              }
            >
              Contact
            </Link>
            <a
              href={"/map/my-Map"}
              className={`px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]`}
            >
              Mindmap
            </a>
          </nav>
          {data?.data?.data ? (
            <div className="flex items-center gap-4">
              <h3 className="text-blue">
                Hi,{" "}
                {data?.data?.data?.name
                  ? data?.data?.data?.name
                  : data?.data?.data?.email}
              </h3>
              <span
                className="flex items-center h-12 gap-2 px-6 btn-primaryy cursor-pointer"
                onClick={handleLogOUT}
              >
                Log out <IoArrowForward fontSize={"22px"} />
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-6 login">
              <Link href={"/auth/signin"} className="text-blue">
                Log In
              </Link>
              <Link
                href={"/auth/signup"}
                className="flex items-center h-12 gap-2 px-6 btn-primaryy"
              >
                Sign Up <IoArrowForward fontSize={"22px"} />
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
