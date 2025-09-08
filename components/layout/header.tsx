import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import MobileNav from "@/components/layout/mobile-nav";
import logo from "../../imgs/logo.svg";
import Image from 'next/image';

const navigation = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { name: "Образцы претензий", href: "/claim-samples" },
  { name: "Конструктор претензий", href: "/claim-builder" },
  { name: "Правовые акты", href: "/legal-documents" },
  { name: "Порядок обращений", href: "/appeal-procedure" },
  { name: "Новости/Статьи", href: "/news" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Логотип Общества защиты потребителей Автопотребитель"
                width={55}
                height={55}
                className="object-contain"
                priority
              />
              <span className="sr-only">Общество защиты потребителей Автопотребитель</span>
            </Link>
          </div>

          <nav className="hidden md:ml-6 md:flex md:space-x-4" role="navigation" aria-label="Основная навигация">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-primary/40"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end">
              <a
                href="tel:+375296062598"
                className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
                aria-label="Позвонить по телефону +375 29 606 25 98"
              >
                <Phone size={16} />
                <span>+375 29 606 25 98</span>
              </a>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MessageCircle size={14} />
                <span>Telegram, Viber</span>
              </div>
            </div>
            <MobileNav navigation={navigation} />
          </div>
        </div>
      </div>
    </header>
  );
}