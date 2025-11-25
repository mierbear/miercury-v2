import ClientSession from "@/components/clientSession";

export default function Home() {

  return (
    <main className="min-w-screen min-h-screen align-center justify-center items-center flex flex-col relative text-center bg-gray-600">
      <ClientSession />
    </main>
  );
}
