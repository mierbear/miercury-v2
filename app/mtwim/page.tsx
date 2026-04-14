import Image from "next/image";
import type { Metadata } from "next";
import MtwimComponent from "@/components/MtwimComponent";

export const metadata: Metadata = {
  title: "Mier: The Weakest Ice Mage",
};

export default function Home() {
  return (
    <main className={``}>
      <MtwimComponent />
    </main>
  );
}