import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Job Portal, Here you can find your dream job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <footer className="container py-8 text-gray-500">
          {`{`}&Sigma;&sigma;{`}`} Job Portal &copy; 2024{" "}
          {new Date().getFullYear() === 2024
            ? ""
            : `- ${new Date().getFullYear()}`}
        </footer>
      </body>
    </html>
  );
}
