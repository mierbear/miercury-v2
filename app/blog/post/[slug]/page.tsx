"use client";
import supabase from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostType from "@/types/postType";
import BlogComponent from "@/components/blogComponent";

export default function PostPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const { slug } = useParams<{ slug: string }>();

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

  const fetchCurrentPost = async () => {
    const { error, data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("fetch failed: ", error.message);
      return;
    }

    setCurrentPost(data);
  }

  useEffect(() => {
    if (!slug) return;

    fetchPosts();
    fetchCurrentPost();
  }, [slug]);

  if (!currentPost) return null;
  
  return (
    <BlogComponent
      type="slug"
      post={currentPost}
      allPosts={posts}
    />
  );
}
