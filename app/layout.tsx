import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/components/fonts/inter";

export const metadata: Metadata = {
  title: {
    template: "%s | MEDDICC Exam",
    default: "MEDDICC Exam",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
