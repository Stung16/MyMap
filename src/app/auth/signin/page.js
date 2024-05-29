"use client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { handleLogin, handleLoginWithGoogle } from "@/services/auth.service";
import Client from "@/config/Client";
import Loading from "@/components/mymap/Loading/Loading";
const page = () => {
  const token = Cookies.get("accessToken");
  const refres = Cookies.get("refreshToken");
  const router = useRouter();
  const [hide, sethide] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await Client.get("/api/auth/profile");
        if (res?.data?.status === 200 && refres) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token, refres]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await handleLogin(data);
    if (res?.data?.status === 200) {
      Cookies.set("accessToken", res?.data?.data?.accessToken, {
        expires: 60 * 60 * 24 * 7,
      });
      Cookies.set("refreshToken", res?.data?.data?.refreshToken, {
        expires: 60 * 60 * 24 * 30,
      });
      Client.setToken(res?.data?.data?.accessToken);
      toast.success("Login success!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Email or Password incorrect!");
    }
  };
  const handleRedirect = async () => {
    const res = await handleLoginWithGoogle();
    if (res?.status === 200) {
      window.location.href = res?.data?.result?.urlRedirect;
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <div className="flex flex-col mt-16 bg-white !z-[199] relative items-center justify-center">
        <h3 className="text-[2.5rem] mb-2 font-semibold">Log In</h3>
        <form
          action=""
          className="w-[24rem] mx-auto flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                required: true,
              })}
            />
          </div>
          <p className="text-[#f73d7b] font-semibold text-[13.5px]">
            {errors.email && "Please enter the correct email format"}
          </p>
          <div className="grid w-full max-w-sm items-center gap-1.5 relative my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type={hide ? "text" : "password"}
              id="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
            <div
              onClick={() => sethide(!hide)}
              className="absolute right-2 bottom-[10px] cursor-pointer  z-10"
            >
              {!hide ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          <p className="text-[#f73d7b] font-semibold text-[13.5px]">
            {errors.password && "Please enter your password!"}
          </p>
          <Link href={"/auth/forgot_pass"} className="mt-2 ml-auto text-end hover:text-[#ddd] w-max select-none">
            Forgot password?
          </Link>
          <Button
            size="lg"
            type="submit"
            className="w-full h-12 mt-4 bg-[#f73d7b] hover:bg-[#f73d7b9c]"
          >
            Login
          </Button>
          <p className="text-center font-[500] mt-4"> OR </p>
          <div>
            <Button
              size="lg"
              onClick={handleRedirect}
              className="flex items-center w-full my-4 font-semibold border boder-[#eee] border-solid bg-transparent text-black hover:bg-slate-600 hover:text-white"
            >
              <FcGoogle fontSize={"1.4rem"} />
              Sign in with Google
            </Button>
          </div>
          <p className="text-center text-black">
            Do not you have account?{" "}
            <Link
              className="text-[#f73d7b] font-semibold"
              href={"/auth/signup"}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
