import AboutComponent from "@/components/aboutComponent";
import type { Metadata } from "next";
import { Sono } from "next/font/google";

export const metadata: Metadata = {
  title: "About Me",
};

const sono = Sono({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${sono.className}`}>
      <AboutComponent />
    </main>
  );
}