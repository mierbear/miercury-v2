import Image from "next/image";
import GalleryComponent from "@/components/galleryComponent";
import { Gowun_Batang } from "next/font/google";

const gowun = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${gowun.className}`}>
      <GalleryComponent />
    </main>
  );

  
}