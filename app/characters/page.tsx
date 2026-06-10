import type { Metadata } from "next";
import Ocs from "@/components/OcsComponent";
import { Noto_Serif_JP } from "next/font/google";

export const metadata: Metadata = {
  title: "Characters",
};

const sono = Noto_Serif_JP({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${sono.className}`}>
      <Ocs />
    </main>
  );
}