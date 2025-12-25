import Image from "next/image";

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col z-50">
      <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col z-50 bg-gray-300">
        1
      </div>
      <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col z-50 bg-gray-400">
        2
      </div>
      <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col z-50 bg-gray-500">
        3
      </div>
      <div className="min-w-screen min-h-screen justify-center align-center items-center flex flex-col z-50 bg-gray-600">
        4
      </div>
    </main>
  );
}