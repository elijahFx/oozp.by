import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FloatingButtons from "@/components/scroll/FloatingButtons";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title:
    "Общество защиты потребителей Автопотребитель | Защита прав потребителей в Беларуси",
  description:
    "Общественное объединение Автопотребитель - защита прав потребителей во всех сферах потребительского рынка в Беларуси. Бесплатные консультации, составление претензий, представление в суде.",
  keywords:
    "защита прав потребителей, претензии, автопотребитель, юридическая помощь, Беларусь, Минск, потребительские споры",
  authors: [{ name: "Общественное объединение Автопотребитель" }],
  creator: "Общественное объединение Автопотребитель",
  publisher: "Общественное объединение Автопотребитель",
  robots: "index, follow",
  openGraph: {
    title: "Общество защиты потребителей Автопотребитель",
    description:
      "Защита прав потребителей во всех сферах потребительского рынка в Беларуси",
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
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest",
      },
    ],
  },
};

// Компонент для скриптов аналитики
function AnalyticsScripts() {
  return (
    <>
      {/* Яндекс.Метрика */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(104384730, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `,
        }}
      />
      {/* Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0KC6R19FS3"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0KC6R19FS3');
          `,
        }}
      />
      {/* Noscript для Яндекс.Метрики */}
      <noscript>
        <div>
          <img 
            src="https://mc.yandex.ru/watch/104384730" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <AnalyticsScripts />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://yandex.by" />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider yandexCounterId={104384730}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow" role="main">
              {children}
            </main>
            <Footer />
            <FloatingButtons />
          </div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}