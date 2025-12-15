import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LenisProvider from "@/components/LenisProvider";
import MainLayout from "@/components/MainLayout";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EgoTax",
  description: "Servicii de contabilitate profesionale în Moldova",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LenisProvider>
          <ThemeProvider
            defaultTheme="system"
            storageKey="egotax-ui-theme"
          >
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
