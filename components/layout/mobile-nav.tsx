"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle, ChevronDown, MessageSquare } from "lucide-react";

const navigation = [
  { name: "Главная", href: "/" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { name: "Образцы претензий", href: "/claim-samples" },
  { name: "Правовые акты", href: "/legal-documents" },
  { name: "Конструктор претензий", href: "/claim-builder" },
  { name: "Порядок обращений", href: "/appeal-procedure" },
  { name: "Новости/Статьи", href: "/news" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        data-track-event="mobile_menu_toggle"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">
          {isOpen ? "Закрыть меню" : "Открыть меню"}
        </span>
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={closeMenu} />

          {/* Menu */}
          <div className="fixed right-4 top-16 w-80 bg-background border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={closeMenu}
                  data-track-event="mobile_logo_click"
                >
                  <span className="text-xl font-bold tracking-tight">
                    Навигация
                  </span>
                </Link>
              </div>

              <nav
                className="flex flex-col space-y-2 mb-4"
                role="navigation"
                aria-label="Мобильная навигация"
              >
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className="flex items-center justify-between w-full px-3 py-2 text-base rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          data-track-event={`mobile_nav_${item.name
                            .toLowerCase()
                            .replace(/\s+/g, "_")}`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openSubmenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openSubmenu === item.name && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-3">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={closeMenu}
                                className="block px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                data-track-event={`mobile_nav_${subItem.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "_")}`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="px-3 py-2 text-base rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        data-track-event={`mobile_nav_${item.name
                          .toLowerCase()
                          .replace(/\s+/g, "_")}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto pt-4 border-t space-y-4">
                <a
                  href="tel:+375296062598"
                  className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Позвонить по телефону +375 29 606 25 98"
                  data-track-event="mobile_phone_click"
                >
                  <Phone size={18} />
                  <span>+375 29 606 25 98</span>
                </a>
                <div className="px-3 space-y-2">
                  <a
                    href="https://t.me/avtopotreb"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Написать в Telegram"
                    data-track-event="mobile_telegram_click"
                  >
                    <MessageCircle size={18} />
                    <span>Telegram</span>
                  </a>
                  <a
                    href="viber://chat?number=%2B375296062598"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Написать в Viber"
                    data-track-event="mobile_viber_click"
                  >
                    <MessageCircle size={18} />
                    <span>Viber</span>
                  </a>
                  <a
                    href="https://wa.me/375296062598"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Написать в WhatsApp"
                    data-track-event="mobile_whatsapp_click"
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}