import "../../assets/css/style.css";
import Footer from "@/components/Layout/item/Footer";
import Header from "@/components/Layout/item/Header";
export const metadata = {
  title: "Home | Mindmap",
  description: "Collaborative Mind Mapping",
  openGraph: {
    title: "Contact | Mindmap",
    description: "Collaborative Mind Mapping",
  },
};
export default function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
