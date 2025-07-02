import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
