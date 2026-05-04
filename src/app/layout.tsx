import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProviders";
import { AuthProvider } from "@/providers/AuthProviders";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FocusFlow",
  description: "AI-Powered Workspace Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}