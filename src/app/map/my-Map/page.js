"use client";
import "../../../assets/css/style.css";
import queryString from "query-string";
import ButtonCreatMap from "@/components/mymap/btn/ButtonCreatMap";
import Avatar from "@/components/mymap/avatar/Avatar";
import CreateDefault from "@/components/mymap/btn/CreateDefault";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { handleCreateMap } from "@/services/map.service";
import { userSlice } from "@/redux/slice/userSlice";
const { updateLoading } = userSlice.actions;
import Loading from "@/components/mymap/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { fetcher } from "@/utils/fn";
import { edges, node_1, node_2, node_3 } from "@/utils/mapUtil";
import { useMemo, useState } from "react";
import Search from "@/components/Layout/item/Search";
import { DataTableDemo } from "@/components/mymap/mapDetail/TableMap/ListMap";
import FavoriteIcon from "@/assets/icons/FavoriteIcon";

const Map = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = {
    page,
    limit: 5,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const { data, isLoading } = useSWR(
    `/api/mindmaps?${queryStringified}`,
    fetcher
  );
  const dataMap = data?.data?.mindmaps;

  const pages = useMemo(() => {
    return data?.data?.count ? Math.ceil(data?.data?.count / query.limit) : 0;
  }, [data, query.limit]);
  const profile = useSelector((state) => state.profileData.profile);
  if (isLoading) {
    return <Loading />;
  }
  // if (!profile) {
  //   router.push("/");
  // }
  const createMindmap1 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~1`,
      user_id: profile?.id,
      nodes: node_1,
      edges: edges,
      edge_type: "default",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/map/${idMap}.~1`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const createMindmap2 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~2`,
      user_id: profile?.id,
      nodes: node_2,
      edges: edges,
      edge_type: "default",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/map/${idMap}.~2`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const createMindmap3 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~3`,
      user_id: profile?.id,
      nodes: node_3,
      edges: [],
      edge_type: "default",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/map/${idMap}.~3`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const createMindmap4 = async () => {
    const idMap = uuidv4();
    const payload = {
      id: `${idMap}.~4`,
      user_id: profile?.id,
      nodes: node_3,
      edges: [],
      edge_type: "straight",
    };
    try {
      dispatch(updateLoading(true));
      const res = await handleCreateMap(payload);
      if (res?.data?.status === 200) {
        router.push(`/map/${idMap}.~4`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between w-full rounded-tl-xl">
        <h3 className="text-2xl">My Maps</h3>
        <div className="flex items-center gap-3">
          <Search onSearch={setSearch} data={dataMap?.length} />
          <Avatar profile={profile} />
        </div>
      </div>
      <div className="flex gap-4">
        <CreateDefault user_id={profile?.id} />
        <ButtonCreatMap
          src={
            "https://res.cloudinary.com/dtht61558/image/upload/v1715068232/chart-map_uyw3tw.svg"
          }
          name="Org chart"
          onClick={createMindmap1}
        />
        <ButtonCreatMap
          src={
            "https://res.cloudinary.com/dtht61558/image/upload/v1715068254/project-retrospective_wewkho.svg"
          }
          name="Retrospective"
          onClick={createMindmap2}
        />
        <ButtonCreatMap
          src={
            "https://res.cloudinary.com/dtht61558/image/upload/v1715068310/project-plan_nadx6x.svg"
          }
          name="mindmap"
          onClick={createMindmap3}
        />
        <ButtonCreatMap
          src={
            "https://res.cloudinary.com/dtht61558/image/upload/v1715068323/smart-goals_b0mwt5.svg"
          }
          name="Retrospective"
          onClick={createMindmap4}
        />
      </div>
      {dataMap?.length ? (
        <DataTableDemo
          data={dataMap}
          user_id={profile?.id}
          query={`/api/mindmaps?${queryStringified}`}
          pages={pages}
          page={page}
          onPage={setPage}
        />
      ) : (
        <div className="flex flex-col items-center h-[60vh] justify-center text-gray">
          <FavoriteIcon className="w-[240px] h-36" />
          <p className="mt-2 text-black">No Favorite Maps</p>
          <p className="w-[400px] text-center">
            You can favorite maps via the context menu, or simply drag them onto
            the sidebar item.
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
