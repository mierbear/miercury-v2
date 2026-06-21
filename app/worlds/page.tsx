import type { Metadata } from "next";
import { redirect } from "next/navigation";
// import Worlds from "@/components/WorldsComponent";

export const metadata: Metadata = {
  title: "Worlds",
};

export default function Home() {
  redirect("/");
  // return (
  //   <main className={``}>
  //     <Worlds />
  //   </main>
  // );
}