import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "Общество защиты потребителей Автопотребитель | Защита прав потребителей в Беларуси",
  description:
    "Общественное объединение Автопотребитель - защита прав потребителей во всех сферах потребительского рынка в Беларуси. Бесплатные консультации, составление претензий, представление в суде.",
  keywords: "защита прав потребителей, претензии, автопотребитель, юридическая помощь, Беларусь, Минск, потребительские споры",
  authors: [{ name: "Общественное объединение Автопотребитель" }],
  creator: "Общественное объединение Автопотребитель",
  publisher: "Общественное объединение Автопотребитель",
  robots: "index, follow",
  openGraph: {
    title: "Общество защиты потребителей Автопотребитель",
    description: "Защита прав потребителей во всех сферах потребительского рынка в Беларуси",
    type: "website",
    locale: "ru_BY",
    siteName: "Автопотребитель",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { 
        url: "/favicon/apple-touch-icon.png", 
        sizes: "180x180", 
        type: "image/png" 
      }
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest"
      }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://yandex.by" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
