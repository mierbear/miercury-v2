import Image from "next/image";
import QuotesComponent from "@/components/quotesComponent";
import { Questrial } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotes",
};

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${questrial.className}`}>
      <QuotesComponent />
    </main>
  );
}