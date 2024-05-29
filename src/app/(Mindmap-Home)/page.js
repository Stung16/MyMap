import "../../assets/css/style.css";
import BtnRedirect from "@/components/mymap/avatar/BtnRedirect";
export const metadata = {
  title: "Home | Mindmap",
  description: "Collaborative Mind Mapping",
  openGraph: {
    title: "Contact | Mindmap",
    description: "Collaborative Mind Mapping",
  },
};
export default function Home() {
  return (
    <div>
      <main className="w-full home pt-[120px]">
        <section className="relative banner">
          <h2 className="text-center heading-2 ">It all starts with an idea</h2>
          <h1 className="text-center heading-1">
            Collaborative <br /> Mind Mapping
          </h1>
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-8 rounded-full">
            <BtnRedirect />
          </div>
        </section>
        <ul className="flex items-center justify-center gap-8 mt-8 mb-8 content">
          <li
            className="px-[20px] py-[30px] rounded-[40px] min-w-[250px] min-h-[200px] flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <Image src="./img/iconH-1.svg" height={60} width={60} alt="icon" />
            <h4 className="mt-auto text-xl font-thin text-center black text-x">
              <p className="text-xl font-bold">Visualize</p>
              your ideas
            </h4>
          </li>
          <li
            className="px-[20px] py-[30px] rounded-[40px] min-w-[250px] min-h-[200px] flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <Image src="./img/iconH-2.svg" height={60} width={60} alt="icon" />
            <h4 className="mt-auto text-xl font-thin text-center black text-x">
              <p className="text-xl font-bold">Collaborate</p>
              with your team
            </h4>
          </li>
          <li
            className="px-[20px] py-[30px] rounded-[40px] min-w-[250px] min-h-[200px] flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <Image src="./img/iconH-3.svg" height={60} width={60} alt="icon" />
            <h4 className="mt-auto text-xl font-thin text-center black text-x">
              <p className="text-xl font-bold">Manage</p>
              your tasks
            </h4>
          </li>
          <li
            className="px-[20px] py-[30px] rounded-[40px] min-w-[250px] min-h-[200px] flex flex-col items-center justify-center"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <Image src="./img/iconH-4.svg" height={60} width={60} alt="icon" />
            <h4 className="mt-auto text-xl font-thin text-center black text-x">
              <p className="text-xl font-bold">Share</p>
              with the world
            </h4>
          </li>
        </ul>
        {/*  */}
        <section className="flex flex-col items-center my-[100px] content">
          <h2 className="tracking-wide heading-2">Add Context to Your Ideas</h2>
          <h3 className="heading-1 !text-6xl mt-2">Add. Link. Integrate.</h3>
          <p className="mt-8 text-xl font-normal tracking-wide text-center text-gray1">
            MindMeister’s web-based, online mind mapping software helps you
            capture, develop and share ideas visually. Once you’ve captured your
            ideas, add context to each topic with links, attachments, embeds and
            integrations. Do more with your ideas.
          </p>
          <img
            src={"./img/chart.svg"}
            className="object-cover w-full h-auto mt-12"
            alt="chart"
          />
        </section>
      </main>
    </div>
  );
}
