"use client";
import SideBarProfile from "@/components/Layout/item/SideBarProfile";
import Loading from "@/components/mymap/Loading/Loading";
import { fetcher } from "@/utils/fn";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { userSlice } from "@/redux/slice/userSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const { updateProfile } = userSlice.actions;

export default function ProfileLayout({ children }) {
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR(`/api/auth/profile`, fetcher);
  useEffect(() => {
    dispatch(updateProfile(data?.data?.data));
  }, [data?.data?.data]);
  if (data?.data?.status === 401) {
    return (window.location.href = "/auth/signin");
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex bg-[#242a2e]">
      <SideBarProfile />
      <div className="flex-1 bg-white rounded-ss-3xl  px-[26px] pt-[15px] h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
