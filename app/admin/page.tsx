import Admin from "@/components/adminComponent";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function page() {
  return (
    <main>
      <Admin />
    </main>
  )
}