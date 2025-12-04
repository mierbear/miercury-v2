import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavMenu from "@/components/NavMenu";
import NavMenu2 from "@/components/NavMenu2";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body>
        {/* <NavMenu open={true} /> */}
        <NavMenu2 open={true} />
        {children}
      </body>
    </html>
  );
}
