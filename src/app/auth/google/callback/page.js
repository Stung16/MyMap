"use client";
import Loading from "@/components/mymap/Loading/Loading";
import Client from "@/config/Client";
import { handleLoginWithGoogleCallback } from "@/services/auth.service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSWRConfig } from "swr";

export default function Auth() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [queryString, setQueryString] = useState("");

  useLayoutEffect(() => {
    // Kiểm tra nếu cửa sổ trình duyệt tồn tại
    if (typeof window !== "undefined") {
      const query = window.location.search;
      setQueryString(query);
    }
  }, []);
  const LoginWithSocail = async (query) => {
    try {
      const res = await handleLoginWithGoogleCallback(query);
      if (res?.status === 200) {
        Cookies.set("accessToken", res?.data?.accessToken, {
          expires: 60 * 60 * 24 * 7,
        });
        Cookies.set("refreshToken", res?.data?.refreshToken, {
          expires: 60 * 60 * 24 * 30,
        });
        Client.setToken(res?.data?.accessToken);
        mutate("/api/auth/profile");
        toast.success("Login success!")
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    LoginWithSocail(queryString);
  }, [queryString]);
  return (
    <>
      <Loading />
    </>
  );
}
