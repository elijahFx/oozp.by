"use client";

import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone size={18} className="mt-0.5 text-muted-foreground" />
                <div>
                  <a
                    href="tel:+375296062598"
                    className="hover:text-primary transition-colors block"
                  >
                    +375 29 606 25 98
                  </a>
                  <span className="text-sm text-muted-foreground">
                    (Telegram, Viber)
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MessageCircle
                  size={18}
                  className="mt-0.5 text-muted-foreground"
                />
                <div>
                  <a
                    href="https://t.me/+375296062598"
                    className="hover:text-primary transition-colors block"
                  >
                    Telegram
                  </a>
                  <a
                    href="viber://chat?number=%2B375296062598"
                    className="hover:text-primary transition-colors block"
                  >
                    Viber
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 text-muted-foreground" />
                <address className="not-italic">
                  220004, г. Минск, ул. Амураторская, д. 4, каб. 209
                </address>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={18} className="mt-0.5 text-muted-foreground" />
                <a
                  href="mailto:legal@oozp.by"
                  className="hover:text-primary transition-colors"
                >
                  legal@oozp.by
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  href="/claim-samples"
                  className="hover:text-primary transition-colors"
                >
                  Образцы претензий
                </Link>
              </li>
              <li>
                <Link
                  href="/appeal-procedure"
                  className="hover:text-primary transition-colors"
                >
                  Порядок обращений
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-primary transition-colors"
                >
                  Новости/Статьи
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Политика обработки персональных данных
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">О нас</h3>
            <p className="text-muted-foreground">
              Общественное объединение "Автопотребитель" защищает права
              потребителей во всех сферах потребительского рынка. Мы оказываем
              юридическую помощь и консультации по защите прав потребителей.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-6">
          <div className="text-center ">
            <h3 className="text-lg font-medium mb-4">Реквизиты организации</h3>
            <div className="text-sm text-muted-foreground space-y-2 max-w-4xl mx-auto">
              <p>
                <span className="font-medium">
                  Свидетельство о гос. регистрации:
                </span>{" "}
                выд. 28.10.2019 г. Минским городским исполнительным комитетом №
                05/1274
              </p>
              <p>
                <span className="font-medium">УНП:</span> 194906387
              </p>
              <p>
                <span className="font-medium">Р/с:</span> BY82 UNBS 3015 1510
                0000 0000 1933
              </p>
              <p>
                <span className="font-medium">Банк:</span> ЗАО «БСБ Банк», г.
                Минск, пр-т Победителей, д. 23, корп. 4
              </p>
              <p>
                <span className="font-medium">BIC:</span> UNBSBY2X
              </p>
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  © 2019-{currentYear} ООЗПП "Автопотребитель". Все права
                  защищены.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
