"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/mymap/Loading/Loading";
import { handleLoginWithGoogle, handleResgiter } from "@/services/auth.service";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleRedirect = async () => {
    const res = await handleLoginWithGoogle();
    if (res?.status === 200) {
      window.location.href = res?.data?.result?.urlRedirect;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await handleResgiter(data);
    if (res?.data?.status === 200) {
      router.push("/auth/signin");
      toast.success("Resgiter success!");
    } else {
      toast.error("Email or Password incorrect!");
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="flex justify-center gap-6 mt-16">
        <div>
          <h3 className="text-[2.5rem] mb-2 font-bold text-black">
            Get started
          </h3>
          <p className="text-lg text-gray">with one of these services</p>
          <div>
            <Button
              onClick={handleRedirect}
              size="lg"
              className="flex items-center w-full my-4 font-semibold border boder-[#eee] text-[18px]  border-solid bg-transparent text-black hover:bg-slate-600 hover:text-white"
            >
              <FcGoogle className="mr-2 text-[30px]" />
              Sign in with Google
            </Button>
          </div>
        </div>
        <div className="flex flex-col border-l-2 border-solid border-blue1 pl-6 bg-white !z-[199] relative items-center justify-center">
          <h3 className="mb-2 text-xl font-semibold">
            with your email address
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[20rem] mx-auto flex flex-col"
          >
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <p className="text-[#f73d7b] font-semibold text-[13.5px]">
              {errors.name && "Please enter your name!"}
            </p>
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
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            <p className="text-[#f73d7b] font-semibold text-[13.5px]">
              {errors.password && "Please enter your password!"}
            </p>

            <Button size="lg" className="w-full h-12 mt-4">
              Sign Up
            </Button>
            <p className="text-center text-black mt-2">
              Do not you have account?{" "}
              <Link
                className="text-[#f73d7b] font-semibold"
                href={"/auth/signin"}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
