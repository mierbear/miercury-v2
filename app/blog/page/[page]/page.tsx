"use client";
import { useEffect, useState } from "react";
import BlogComponent from "@/components/blogComponent";
import supabase from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import PostType from "@/types/postType";

const POSTS_PER_PAGE = 3;

export default function Home({
  params,
}: {
  params: { page: string };
}) {
  const parameters = useParams();
  const page = Number(parameters.page) || 1;
  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    const { error, data } = await supabase
      .from("posts")
      .select("*")
      .order("date_created", { ascending: false })

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    setPosts(data);
  }

  const fetchCurrentPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("date_created", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }
    
    setCurrentPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentPosts();
  }, []);

  return (
    <BlogComponent
      p={posts}
      cp={currentPosts}
      pg={page}
      ppp={POSTS_PER_PAGE}
    />
  );
}