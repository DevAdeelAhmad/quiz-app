import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { AuthContextProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/hooks/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Quizzy",
  description: "Quizzy | Find & Take!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          suppressContentEditableWarning
          className={`${inter.className} bg-background`}
        >
          <ThemeProvider enableSystem={true} attribute="class">
            <NextTopLoader zIndex={10000} height={5} color="#3a9efd" />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
