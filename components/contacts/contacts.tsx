import React from "react";
import { Phone } from "lucide-react";
import Link from "next/link";

function Contacts() {
  return (
    <div className="mt-2 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Нужна помощь специалиста?
      </h3>
      <p className="text-gray-700 mb-4">
        Не оставайтесь с проблемой один на один! Наши юристы помогут вам
        защитить ваши права.
      </p>

      {/* Основные контакты */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <a
          href="tel:+375296062598"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Phone className="w-5 h-5" />
          +375 (29) 606-25-98
        </a>
        <span className="text-sm text-gray-600">
          или напишите в мессенджеры:
        </span>

        <div className="flex flex-wrap gap-3 mb-1">
          <a
            href="viber://chat?number=%2B375296062598"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <span className="text-lg">💜</span>
            Viber
          </a>
          <a
            href="https://t.me/avtopotreb"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <span className="text-lg">📤</span>
            Telegram
          </a>
          <a
            href="https://wa.me/375296062598"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            <span className="text-lg">💚</span>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Конструктор претензий */}
      <div className="border-t pt-4 border-green-200 flex flex-center align-center justify-center flex-col">
        <p className="text-gray-700 mb-3 text-sm">
          Также вы можете самостоятельно составить претензию:
        </p>
        <Link
          href="https://oozp.by/claim-builder"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          <span className="text-lg">📝</span>
          Составить претензию автоматически
        </Link>
      </div>
    </div>
  );
}

export default Contacts;
