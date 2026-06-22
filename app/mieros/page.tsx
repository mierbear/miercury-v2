import MierOS from "@/components/mierOSComponent";
import { Inconsolata } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MierOS",
};

const inconsolata = Inconsolata({
  weight: ["200", "300"],
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${inconsolata.className}`}>
      <MierOS />
    </main>
  );
}