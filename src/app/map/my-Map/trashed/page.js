"use client";
import Avatar from "@/components/mymap/avatar/Avatar";
import queryString from "query-string";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useMemo, useState } from "react";
import useSWR from "swr";
import Loading from "@/components/mymap/Loading/Loading";
import { fetcher } from "@/utils/fn";
import Search from "@/components/Layout/item/Search";
import { DataTableDemo } from "@/components/mymap/mapDetail/TableMap/ListMap";
const Trashsed = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const query = {
    page,
    limit: 5,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const { data, isLoading } = useSWR(
    `/api/delete/mindmaps?${queryStringified}`,
    fetcher
  );
  const pages = useMemo(() => {
    return data?.data?.count ? Math.ceil(data?.data?.count / query.limit) : 0;
  }, [data, query.limit]);
  if (isLoading) {
    return <Loading />;
  }
  const mapDeleted = data?.data?.mindmaps;
  const user_id = mapDeleted?.[0]?.user_id;
  return (
    <div>
      <div className="flex items-center justify-between w-full rounded-tl-xl">
        <h3 className="text-2xl">Trashsed Maps</h3>
        <div className="flex items-center gap-3">
          <Search onSearch={setSearch} data={mapDeleted?.length} />
          <Avatar />
        </div>
      </div>
      {mapDeleted?.length ? (
        <DataTableDemo
          data={mapDeleted}
          user_id={user_id}
          query={`/api/delete/mindmaps?${queryStringified}`}
          pages={pages}
          page={page}
          onPage={setPage}
          deleted={true}
        />
      ) : (
        <div className="flex flex-col items-center h-[60vh] justify-center text-gray">
          <div className="bg-[#e8eaeb] rounded-full w-[120px] h-[120px] flex justify-center items-center">
            <TrashIcon className="w-10 h-[53px]" />
          </div>
          <p className="mt-2 text-black">Trash Empty</p>
          <p className="w-[400px] text-center">There are no deleted items.</p>
        </div>
      )}
    </div>
  );
};

export default Trashsed;
