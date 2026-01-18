import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="w-full h-screen flex items-center">{children}</body>
    </html>
  );
}
