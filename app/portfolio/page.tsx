import PortfolioComponent from "@/components/portfolioComponent";
import type { Metadata } from "next";
import { Questrial } from "next/font/google";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function Home() {
  return (
    <main className={`${questrial.className}`}>
      <PortfolioComponent />
    </main>
  );
}