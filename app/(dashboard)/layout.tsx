"use client";
import localFont from "next/font/local";
import Sidebar from "@/components/Sidebar/Sidebar";
import ConnectWallet from "@/components/ConnectWallet/ConnectWallet";
import { useState } from "react";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className={` ${
            !isSidebarOpen
              ? "-translate-x-full lg:translate-x-0"
              : " lg:translate-x-0"
          } transition-all duration-300`}
        >
          <div
            className={`block lg:hidden ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 fixed inset-0 bg-black bg-opacity-50 z-50`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed lg:static z-[100]">
            <Sidebar />
          </div>
        </div>
        <main className="lg:ml-[286px] flex-grow bg-[#FAFAFA] min-h-screen">
          {" "}
          <header className="py-4 px-4 md:py-7 md:px-16 flex flex-col md:flex-row gap-4 items-center justify-between lg:justify-end shadow-header bg-[#F6F6F7]">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="button block lg:hidden"
            >
              Menu
            </button>
            <ConnectWallet />
          </header>
          <div className="p-3 md:p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
