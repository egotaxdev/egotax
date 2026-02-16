import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LenisProvider from "@/components/LenisProvider";
import MainLayout from "@/components/MainLayout";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  variable: "--font-raleway",
  display: "swap",
});

const siteUrl = "https://egotax.md";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EgoTax - Servicii de Contabilitate Profesionale în Moldova",
    template: "%s | EgoTax",
  },
  description:
    "EgoTax oferă servicii profesionale de contabilitate, consultanță fiscală și suport în inițierea afacerii în Moldova. Peste 7 ani de experiență și 500+ clienți mulțumiți.",
  keywords: [
    "contabilitate Moldova",
    "servicii contabile Chișinău",
    "consultanță fiscală",
    "evidență contabilă",
    "restabilire contabilitate",
    "analiză financiară",
    "înregistrare firmă Moldova",
    "EgoTax",
  ],
  authors: [{ name: "EgoTax SRL" }],
  creator: "EgoTax SRL",
  publisher: "EgoTax SRL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteUrl,
    siteName: "EgoTax",
    title: "EgoTax - Servicii de Contabilitate Profesionale în Moldova",
    description:
      "Servicii profesionale de contabilitate, consultanță fiscală și suport pentru afaceri în Moldova. Peste 7 ani de experiență.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EgoTax - Contabilitate Moldova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EgoTax - Servicii de Contabilitate Profesionale în Moldova",
    description:
      "Servicii profesionale de contabilitate, consultanță fiscală și suport pentru afaceri în Moldova.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className={`${raleway.variable} font-sans antialiased`}>
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
