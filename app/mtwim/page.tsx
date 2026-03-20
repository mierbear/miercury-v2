import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mier: The Weakest Ice Mage",
};

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col">
      <h1>mtwim</h1>
    </main>
  );
}