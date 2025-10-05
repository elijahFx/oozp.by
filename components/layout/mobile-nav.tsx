"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

export default function MobileNav({ navigation }: { navigation: { name: string, href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Отслеживаем открытие/закрытие меню
    if (!isOpen) {
      // Здесь можно добавить событие для открытия меню, если нужно
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        data-track-event="mobile_menu_toggle"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
        <span className="sr-only">{isOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
      </Button>
      
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closeMenu}
          />
          
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
                  <span className="text-xl font-bold tracking-tight">ООЗП.BY</span>
                </Link>
              </div>
              
              <nav className="flex flex-col space-y-4" role="navigation" aria-label="Мобильная навигация">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="px-3 py-2 text-base rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    data-track-event={`mobile_nav_${item.name.toLowerCase().replace(/\s+/g, '_')}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto pt-6 border-t space-y-4">
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
                    href="https://t.me/+375296062598"
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}