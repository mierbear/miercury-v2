import PpComponent from "@/components/ppComponent";
import { Questrial } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pacific Purgatory",
};

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${questrial.className}`}>
      <PpComponent />
    </main>
  );
}