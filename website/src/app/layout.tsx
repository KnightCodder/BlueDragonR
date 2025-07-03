import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/componenets/Header";
import { Footer } from "@/componenets/Footer";

export const metadata: Metadata = {
  title: "BlueDragonR",
  description: "Website for my chess engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
