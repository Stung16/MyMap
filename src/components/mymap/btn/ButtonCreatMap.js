import Image from "next/image";
function ButtonCreatMap({ src, name, onClick }) {
  return (
    <div
      // href={"/mind-maps/123"}
      className={`px-4 mt-4 cursor-pointer mb-6 flex-col flex justify-center gap-2  items-center bg-[#0000000D] hover:bg-[#1d1d1d1f] py-3 !rounded-xl  w-[140px] h-[113px]`}
      onClick={onClick}
    >
      <Image src={src} alt={name} width={64} height={48} priority/>
      <p className="text-sm text-black">{name}</p>
    </div>
  );
}

export default ButtonCreatMap;
