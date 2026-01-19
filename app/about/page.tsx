import AboutComponent from "@/components/aboutComponent";
import { Sono } from "next/font/google";

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