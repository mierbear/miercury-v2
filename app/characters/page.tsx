import type { Metadata } from "next";
import Ocs from "@/components/OcsComponent";

export const metadata: Metadata = {
  title: "Characters",
};

export default function Home() {
  return (
    <main className={``}>
      <Ocs />
    </main>
  );
}