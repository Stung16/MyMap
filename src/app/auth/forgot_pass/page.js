"use client";
import Image from "next/image";
import { handleForgotPas } from "@/services/auth.service";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await handleForgotPas(data);
    if (res?.data?.status === 200) {
      toast.success("Please check your Email!!!");
    }
    // if (res?.data?.status === 200) {
    //   Cookies.set("accessToken", res?.data?.data?.accessToken, {
    //     expires: 60 * 60 * 24 * 7,
    //   });
    //   Cookies.set("refreshToken", res?.data?.data?.refreshToken, {
    //     expires: 60 * 60 * 24 * 30,
    //   });
    //   Client.setToken(res?.data?.data?.accessToken);
    //   toast.success("Login success!");
    //   setTimeout(() => {
    //     router.push("/");
    //   }, 1500);
    // } else {
    //   toast.error("Email or Password incorrect!");
    // }
  };
  return (
    <main
      id="content"
      role="main"
      className="w-full max-w-md mx-auto p-6 h-[calc(100vh-70px)] flex items-center flex-col justify-center"
    >
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7 min-w-[400px]">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium text-[#f73d7b] font-semibold"
                href="/auth/signin"
              >
                Login here
              </a>
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      {...register("email", {
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        required: true,
                      })}
                      aria-describedby="email-error"
                    />
                    <p className="text-[#f73d7b] font-semibold text-[13.5px]">
                      {errors.email && "Please enter the correct email format"}
                    </p>
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex bg-[#f7578c] justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
        <a
          className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="#"
          target="_blank"
        >
          <FaGoogle />
          View Google
        </a>
        <a
          className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="/contact"
        >
          Contact us!
        </a>
      </p>
    </main>
  );
};

export default page;
