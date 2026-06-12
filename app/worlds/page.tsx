import Image from "next/image";
import type { Metadata } from "next";
import Worlds from "@/components/WorldsComponent";

export const metadata: Metadata = {
  title: "Worlds",
};

export default function Home() {
  return (
    <main className={``}>
      <Worlds />
    </main>
  );
}