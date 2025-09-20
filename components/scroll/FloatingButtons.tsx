"use client";

import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  // Показываем кнопку "Наверх" после прокрутки на 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Функция для прокрутки наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Кнопка "Наверх" */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Вернуться наверх"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}

      {/* Иконка Telegram с пульсацией */}
      <a
        href="https://t.me/avtopotreb"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#0088cc] hover:bg-[#0077b3] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center relative pulsating-element"
        aria-label="Написать в Telegram"
      >
        <div className="absolute inset-0 rounded-full bg-[#0088cc] animate-ping opacity-75"></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
        </svg>
      </a>

      {/* Иконка Viber с пульсацией */}
      <a
        href="viber://chat?number=375296062598"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#7360f2] hover:bg-[#5e4dd1] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center relative pulsating-element"
        aria-label="Написать в Viber"
      >
        <div className="absolute inset-0 rounded-full bg-[#7360f2] animate-ping opacity-75"></div>
        <PhoneCall className="pr-[1.5px] relative z-10" size={24} />
      </a>

      {/* Стили для пульсации */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        .pulsating-element:hover {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .pulsating-element:hover .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}