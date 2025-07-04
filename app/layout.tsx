import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head"; // Импортируем Head
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TelegramWidget from "@/components/ui/telegram-widget";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Общество защиты потребителей",
  description:
    "Защита прав потребителей в сфере услуг, строительства, банковского дела и торговли",
  icons: {
    // Добавляем иконки в metadata
    icon: "./favicon/favicon.ico",
    apple: "./favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <Head>
        {" "}
        {/* Добавляем Head для кастомных тегов */}
        <link rel="icon" href="./favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="./favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="./favicon/apple-touch-icon.png" />
        <link rel="manifest" href="./favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <TelegramWidget />
        </div>
      </body>
    </html>
  );
}
