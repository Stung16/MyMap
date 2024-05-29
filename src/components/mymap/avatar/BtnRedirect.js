"use client";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { handleLoginWithGoogle } from "@/services/auth.service";
import Cookies from "js-cookie";

const BtnRedirect = () => {
  const [isLogin, setIslogin] = useState(false);
  const token = Cookies.get("accessToken");
  const refres = Cookies.get("refreshToken");
  const handleRedirect = async () => {
    const res = await handleLoginWithGoogle();
    if (res?.status === 200) {
      window.location.href = res?.data?.result?.urlRedirect;
    }
  };
  useEffect(() => {
    if (token && refres) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, [token, refres]);
  return (
    <button
      className="flex items-center gap-2 px-10 py-4 text-lg font-bold btn-primaryy"
      onClick={() => {
        if (!isLogin) {
          handleRedirect();
        }
      }}
    >
      <div className="bg-white  rounded-full grid place-items-center w-[36px] h-[36px]">
        <FcGoogle fontSize={"1.5rem"} />
      </div>
      Continue with Google
    </button>
  );
};

export default BtnRedirect;
