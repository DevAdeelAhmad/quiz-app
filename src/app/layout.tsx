import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader'
export const metadata: Metadata = {
  title: "Quizify",
  description: "Quizify | Find & Take!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <NextTopLoader color="red" />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
