"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useSWR, { useSWRConfig } from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import UploadImage from "@/components/mymap/avatar/UploadImage";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "@/services/auth.service";
import Loading from "@/components/mymap/Loading/Loading";
import { fetcher } from "@/utils/fn";
const page = () => {
  const { mutate } = useSWRConfig();
  const profile = useSelector((state) => state.profileData.profile);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setName(profile?.name);
    setDesc(profile?.desc);
  }, [profile]);
  let avatar = profile?.avatar;

  const handleSubmitProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (files?.length) {
      const formData = new FormData();
      files.forEach((file) => formData.append("file", file));
      const res = await fetch(`${process.env.SERVER_API}/api/upload`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      if (res?.status === 201) {
        avatar = res?.data?.url;
      }
    }
    const payload = {
      name,
      avatar,
      desc,
    };
    const resUpdata = await updateUser(payload);
    console.log(resUpdata);
    setLoading(false);
    if (resUpdata?.data?.status === 200) {
      mutate("/api/auth/profile");
      toast.success("Update profile success!");
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <div className="relative px-10 pt-10">
        <h3 className="mb-4 text-2xl font-bold capitalize">Profile</h3>
        <div className="flex flex-col w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>This is my profile</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <form
                onSubmit={handleSubmitProfile}
                className="flex items-start gap-10"
              >
                <div className="mt-2 w-[500px] flex flex-col gap-4 pb-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="Name">Name</Label>
                    <Input
                      type="text"
                      size="md"
                      variant="bordered"
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={name}
                    />
                  </div>

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Description</Label>
                    <Textarea
                      placeholder="Enter your description"
                      id="message"
                      key="description"
                      onChange={(e) => setDesc(e.target.value)}
                      defaultValue={desc}
                    />
                  </div>
                  <button className="btn-primaryy !rounded-lg py-3">
                    Save changes
                  </button>
                </div>
                <UploadImage
                  userInfo={profile}
                  onFiles={setFiles}
                  files={files}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
