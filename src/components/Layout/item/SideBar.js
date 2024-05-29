'use client'
import { BiNetworkChart } from "react-icons/bi"
import { TbWorld } from "react-icons/tb"
import { TbTrash } from "react-icons/tb"
import { MdOutlineStarOutline } from "react-icons/md"
import Link from 'next/link'
import { usePathname } from "next/navigation";
import LogoIcon from '@/assets/icons/LogoIcon'
import "../../../app/globals.css"

const SideBar = () => {
    const pathname = usePathname();

  return (
    <div className="flex flex-col pt-4 px-[10px] w-[240px] bg-[#242a2e] text-white min-h-[100vh]">
    <Link href={"/"} className="mb-5">
      <LogoIcon className="w-28" />
    </Link>
    <Link
      href={"/map/my-Map"}
      className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
        pathname === "/map/my-Map" && "bg-blue"
      }`}
    >
      <BiNetworkChart fontSize={"1.6rem"} />
      <span>My Maps</span>
    </Link>
    <Link
      href={"/map/my-Map/favorite"}
      className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
        pathname === "/map/my-Map/favorite" && "bg-blue"
      }`}
    >
      <MdOutlineStarOutline fontSize={"1.6rem"} />
      <span>Favorites</span>
    </Link>
    <Link
      href={"/map/my-Map/public"}
      className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
        pathname === "/map/my-Map/public" && "bg-blue"
      }`}
    >
      <TbWorld fontSize={"1.6rem"} />
      <span>Public</span>
    </Link>
    <Link
      href={"/map/my-Map/trashed"}
      className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
        pathname === "/map/my-Map/trashed" && "bg-blue"
      }`}
    >
      <TbTrash fontSize={"1.6rem"} />
      <span>Trash</span>
    </Link>
   
  </div>
  )
}

export default SideBar