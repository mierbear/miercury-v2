import IndexComponent from "../components/indexComponent";
import { Anonymous_Pro } from "next/font/google";

const anonymous = Anonymous_Pro({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <main className={`${anonymous.className}`}>
      <IndexComponent />
    </main>
  );
}
