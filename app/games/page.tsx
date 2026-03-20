import GamesComponent from "@/components/gamesComponent";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
};

const outfit = Outfit({
  weight: ["300", "700"],
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${outfit.className}`}>
      <GamesComponent />
    </main>
  );
}