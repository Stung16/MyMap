import MapDetail from "@/components/mymap/mapDetail/PageDetail";
import { cookies } from "next/headers";
const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const res = await fetch(`${process.env.SERVER_API}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const data = await res?.json();
  return <MapDetail user_id={data?.data?.id} />;
};

export default page;
