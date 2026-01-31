import type { Metadata } from "next";
import NavMenu from "@/components/NavMenu";
import DailyModal from "@/components/dailyModalComponent";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "tiptap-extension-resizable-image/styles.css";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
// import { Sono } from "next/font/google";

// const sono = Sono({
//   weight: "400",
//   subsets: ["latin"],
// })

export const metadata: Metadata = {
  title: "Miercury",
  description: "Miercury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#17191a]`}>
        <NavMenu />
        <DailyModal />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
