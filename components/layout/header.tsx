import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";
import MobileNav from "@/components/layout/mobile-nav";
import logo from "../../imgs/logo.svg";
import Image from 'next/image';

const navigation = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { 
    name: "Документы", 
    href: "#",
    submenu: [
      { name: "Образцы претензий", href: "/claim-samples" },
      { name: "Правовые акты", href: "/legal-documents" },
    ]
  },
  { name: "Конструктор претензий", href: "/claim-builder" },
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
                width={45}
                height={45}
                className="object-contain"
                priority
              />
              <span className="sr-only">Общество защиты потребителей Автопотребитель</span>
            </Link>
          </div>

          <nav className="hidden md:ml-6 md:flex md:space-x-1" role="navigation" aria-label="Основная навигация">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative group"
              >
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className={cn(
                        "inline-flex items-center px-2 py-2 text-sm font-medium transition-colors",
                        "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-primary/40",
                        "pr-1 cursor-pointer"
                      )}
                    >
                      {item.name}
                      <ChevronDown size={14} className="ml-1 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-md border min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={cn(
                      "inline-flex items-center px-2 py-2 text-sm font-medium transition-colors",
                      "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-primary/40"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex flex-col items-end">
              <a
                href="tel:+375296062598"
                className="flex items-center space-x-1 text-sm hover:text-primary transition-colors whitespace-nowrap"
                aria-label="Позвонить по телефону +375 29 606 25 98"
              >
                <Phone size={16} />
                <span>+375 29 606 25 98</span>
              </a>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <MessageCircle size={12} />
                <span>Telegram/Viber</span>
              </div>
            </div>
            
            {/* Компактная версия для средних экранов */}
            <div className="hidden md:flex lg:hidden items-center space-x-2">
              <a
                href="tel:+375296062598"
                className="p-2 hover:text-primary transition-colors"
                aria-label="Позвонить"
              >
                <Phone size={18} />
              </a>
              <a
                href="https://t.me/avtopotreb"
                className="p-2 hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="viber://chat?number=375296062598"
                className="p-2 hover:text-primary transition-colors"
                aria-label="Viber"
              >
                <Phone size={18} className="transform rotate-90" />
              </a>
            </div>
            
            <MobileNav navigation={navigation} />
          </div>
        </div>
      </div>
    </header>
  );
}