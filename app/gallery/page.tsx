import GalleryComponent from "@/components/galleryComponent";
import { Gowun_Batang } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
};

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