import NextLink from "next/link"
import PostType from "@/types/postType"

type BlogPostListProps = {
  allPosts: PostType[];
}

export default function BlogPostListComponent({ allPosts }: BlogPostListProps) {
  return (
    <div className="bg-[#adb7be]/20 z-50 flex flex-col items-center">
      <h1 className="py-4 font-bold">archive</h1>

      {allPosts.map((post) => (
        <div
          key={post.id}
          className="rounded-md max-w-[85ch] w-full flex flex-row items-center justify-between pl-4 pr-4 z-50"
        >
          <NextLink href={`/blog/post/${post.slug}`}>
            <p className="hover:underline blue text-sm">{post.title}</p>
          </NextLink>

          <div className="text-xs text-gray-400 select-none flex">
            <p>— {post.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}