import type { Metadata } from "next";
import Ocs from "@/components/OcsComponent";
import { Sono } from "next/font/google";

export const metadata: Metadata = {
  title: "Characters",
};

const sono = Sono({
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