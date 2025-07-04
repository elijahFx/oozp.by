"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/layout/mobile-nav";
import logo from "../../imgs/logo.svg";
import Image from 'next/image';

const navigation = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { name: "Образцы претензий", href: "/claim-samples" },
  { name: "Конструктор претензий", href: "/claim-builder" },
  { name: "Порядок обращений", href: "/appeal-procedure" },
  { name: "Новости/Статьи", href: "/news" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="Логотип"
                width={55}
                height={55}
                className="object-contain cursor-pointer transition-all duration-400"
              />
            </Link>
          </div>

          <nav className="hidden md:ml-6 md:flex md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-primary/40"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end">
              <a
                href="tel:+375293948416"
                className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
              >
                <Phone size={16} />
                <span>+375 29 394 84 16</span>
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
