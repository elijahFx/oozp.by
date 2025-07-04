'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TelegramWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показать виджет через небольшую задержку
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open('https://t.me/+375293948416', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110 animate-bounce"
        style={{
          animationDuration: '2s',
          animationIterationCount: 'infinite',
        }}
        aria-label="Написать в Telegram"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Пульсирующие кольца */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
            Написать в Telegram
            <div className="absolute top-full right-4 h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </button>
    </div>
  );
}