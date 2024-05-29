import React, { useMemo, useState } from "react";
import { DataTableDemo } from "./ListMap";
import useSWR from "swr";
import { fetcher } from "@/utils/fn";
import Loading from "../../Loading/Loading";
import queryString from "query-string";

const TableMap = ({ user_id, search }) => {
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
  const pages = useMemo(() => {
    return data?.data?.count
      ? Math.ceil(data?.data?.count / query.limit)
      : 0;
  }, [data, query.limit]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-h-[300px]">
      <DataTableDemo
        data={data?.data?.mindmaps}
        user_id={user_id}
        pages={pages}
        page={page}
        onPage={setPage}
        query={`/api/mindmaps?${queryStringified}`}
      />
    </div>
  );
};

export default TableMap;
