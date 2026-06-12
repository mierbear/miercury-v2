"use client";
import Comic from "@/components/ComicComponent";
import { use } from "react";
import { redirect } from "next/navigation";

export default function Read({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = use(params);
  const chapterNum = parseInt(chapter);
  
  if (chapter !== String(chapterNum)) {
    redirect(`/mtwim/read/${chapterNum}`);
  }

  return (
    <main>
      <Comic initialChapter={chapterNum} />
    </main>
  )
}