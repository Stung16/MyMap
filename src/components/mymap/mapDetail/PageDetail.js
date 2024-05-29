"use client";
import { FaShare } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaSave } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import "../../../../src/assets/css/style.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContentEditable from "react-contenteditable";
import { fetcher, formattedContent } from "@/utils/fn";
import useSWR, { useSWRConfig } from "swr";
import Avatar from "@/components/mymap/avatar/Avatar";
import Flow from "@/components/mymap/mapDetail/Flow";
import { mapSlice } from "@/redux/slice/mapSlice";
const { setType } = mapSlice.actions;
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/mymap/Loading/Loading";
import { handleSaveMap } from "@/services/map.service";
import BtnShare from "@/components/mymap/btn/BtnShare";
import NotFound from "@/app/not-found";
const MapDetail = ({ user_id }) => {
  const [values, setValues] = useState("default");
  const router = useRouter();
  const dispatch = useDispatch();
  const [updateMaps, setUpdateMaps] = useState(null);
  const { mutate } = useSWRConfig();
  const { id } = useParams();
  const type = id.split("~")[1];
  const { data, isLoading } = useSWR(`/api/mindmaps/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const isPublic = data?.data?.mindmap?.status;
  const [title, setTitle] = useState(
    data?.data?.mindmap?.title || "Không có tiêu đề mindmap"
  );
  const [desc, setDesc] = useState(
    data?.data?.mindmap?.desc || "Chưa có mô tả"
  );
  useEffect(() => {
    setValues(data?.data?.mindmap?.edge_type || "default");
    setTitle(data?.data?.mindmap?.title || "Không có tiêu đề mindmap");
    setDesc(data?.data?.mindmap?.desc || "Chưa có mô tả");
    document.title = data?.data?.mindmap?.title;
  }, [data, id]);
  const handleChangeTitle = (evt) => {
    if (evt.target.value !== "") {
      document.title = formattedContent(evt.target.value);
      setTitle(formattedContent(evt.target.value));
    } else {
      document.title = "Không có tiêu đề mindmap";
      setTitle("Không có tiêu đề mindmap");
    }
  };
  const handleChangeDesc = (evt) => {
    setDesc(evt.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const handlesavemap = async () => {
    const payload = Object.assign(updateMaps, {
      title: title,
      desc: desc,
    });
    const res = await handleSaveMap(id, payload);
    if (res.data?.status === 200) {
      toast.success("Lưu thành công!!!");
      mutate("/api/mindmaps");
      mutate(`/api/mindmaps/${id}`);
    } else {
      toast.error("Đã có lỗi xảy ra!!!");
    }
  };
  useEffect(() => {
    dispatch(setType(type));
  }, [id]);
  return (
    <div>
      {data?.data?.status === 404 ? (
        <NotFound />
      ) : (
        <div>
          <div className="flex items-start mt-5 px-[35px] gap-6">
            <div className="w-full flex items-start gap-8">
              <div
                className="flex items-center gap-1 px-6 py-3 mb-3 text-black bg-white border border-solid rounded-full border-[#ddd] shadow-md w-max whitespace-normal min-w-[180px] hover:shadow-xl transition-all font-semibold cursor-pointer"
                onClick={() => {
                  router.push(`/map/my-Map`);
                  mutate("/api/mindmaps");
                }}
              >
                <IoIosArrowBack fontSize={"1.3rem"} />
                my mindmap
              </div>
              <div className="flex flex-col">
                <ContentEditable
                  className={`heading-1 !text-2xl outline-none ${
                    isPublic || user_id === data?.data?.mindmap?.user_id
                      ? ""
                      : "select-none"
                  }`}
                  html={title}
                  disabled={
                    isPublic || user_id === data?.data?.mindmap?.user_id
                      ? false
                      : true
                  }
                  onKeyDown={handleKeyDown}
                  onChange={handleChangeTitle}
                />
                <ContentEditable
                  html={desc || ""}
                  onKeyDown={handleKeyDown}
                  className={`mt-2 text-xl font-thin text-black outline-none ${
                    isPublic || user_id === data?.data?.mindmap?.user_id
                      ? ""
                      : "select-none"
                  }`}
                  disabled={
                    isPublic || user_id === data?.data?.mindmap?.user_id
                      ? false
                      : true
                  }
                  onChange={handleChangeDesc}
                />
              </div>
              {(isPublic || user_id === data?.data?.mindmap?.user_id) && (
                <div className="flex gap-6 ml-auto w-[40%] justify-end ">
                  <div className="relative">
                    <Label className="absolute left-[6px] top-[-8px] bg-white p-[2px]">
                      Edge type
                    </Label>
                    <Select
                      onValueChange={setValues}
                      defaultValue={values}
                      value={values}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="edges type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="straight">straight</SelectItem>
                        <SelectItem value="smoothstep">smoothstep</SelectItem>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="step">step</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <button
                    className="btn-primaryy !rounded-full h-10 px-4 flex gap-2 items-center"
                    onClick={handlesavemap}
                  >
                    <FaSave fontSize={"1.2rem"} />
                    Save
                  </button>
                  <BtnShare status={data?.data?.mindmap?.status} id={id} />
                  {user_id && <Avatar />}
                </div>
              )}
            </div>
          </div>
          {/* Flow */}
          <div className="h-[calc(100vh-6.5rem)]">
            <Flow
              handlesavemap={handlesavemap}
              dataMap={data?.data?.mindmap}
              onUpdateMaps={setUpdateMaps}
              edge_type={values}
            />
          </div>
          {isLoading && <Loading />}
        </div>
      )}
    </div>
  );
};

export default MapDetail;
