import {
  Phone,
  MapPin,
  Mail,
  MessageCircle,
  FileText,
  Building,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Контакты */}
          <div>
            <h3 className="text-lg font-medium mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone size={18} className="mt-0.5 text-muted-foreground" />
                <div>
                  <a
                    href="tel:+375296062598"
                    className="hover:text-primary transition-colors block"
                    aria-label="Позвонить по телефону +375 29 606 25 98"
                    data-track-event="footer_phone_click"
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
                    aria-label="Написать в Telegram"
                    data-track-event="footer_telegram_click"
                  >
                    Telegram
                  </a>
                  <a
                    href="viber://chat?number=%2B375296062598"
                    className="hover:text-primary transition-colors block"
                    aria-label="Написать в Viber"
                    data-track-event="footer_viber_click"
                  >
                    Viber
                  </a>
                  <a
                    href="https://wa.me/375296062598"
                    className="hover:text-primary transition-colors block"
                    aria-label="Написать в WhatsApp"
                    data-track-event="footer_whatsapp_click"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 text-muted-foreground" />
                <address className="not-italic">
                  220004, г. Минск, ул. Амураторская, д. 4, 2 этаж, каб. 209
                </address>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={18} className="mt-0.5 text-muted-foreground" />
                <a
                  href="mailto:legal@oozp.by"
                  className="hover:text-primary transition-colors"
                  aria-label="Написать на email legal@oozp.by"
                  data-track-event="footer_email_click"
                >
                  legal@oozp.by
                </a>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-lg font-medium mb-4">Навигация</h3>
            <nav role="navigation" aria-label="Навигация в подвале">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_about_click"
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_contacts_click"
                  >
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link
                    href="/claim-samples"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_claim_samples_click"
                  >
                    Образцы претензий
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal-documents"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_legal_documents_click"
                  >
                    Правовые акты
                  </Link>
                </li>
                <li>
                  <Link
                    href="/claim-builder"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_legal_documents_click"
                  >
                    Конструктор претензий
                  </Link>
                </li>
                <li>
                  <Link
                    href="/appeal-procedure"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_appeal_procedure_click"
                  >
                    Порядок обращений
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_news_click"
                  >
                    Новости/Статьи
                  </Link>
                </li>
                <li>
                  <Link
                    href="/podpis"
                    className="hover:text-primary transition-colors"
                    prefetch={true}
                    data-track-event="footer_news_click"
                  >
                    Электронная подпись
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* О нас */}
          <div>
            <h3 className="text-lg font-medium mb-4">О нас</h3>
            <p className="text-muted-foreground mb-4">
              Общественное объединение по защите прав потребителей
              "Автопотребитель" защищает права потребителей во всех сферах
              потребительского рынка. Мы оказываем юридическую помощь и
              консультации по защите прав потребителей.
            </p>
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
              prefetch={true}
              data-track-event="footer_privacy_policy_click"
            >
              <FileText size={14} />
              Политика обработки персональных данных
            </Link>
          </div>

          {/* Реквизиты */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Building size={18} />
              Реквизиты
            </h3>
            <div className="text-sm text-muted-foreground space-y-3">
              <div>
                <p className="font-medium mb-1">
                  Свидетельство о гос. регистрации:
                </p>
                <p>
                  выд. 28.10.2019 г. Минским городским исполнительным комитетом
                  № 05/1274
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">УНП:</p>
                <p>194906387</p>
              </div>
              <div>
                <p className="font-medium mb-1">Расчетный счет:</p>
                <p>BY82 UNBS 3015 1510 0000 0000 1933</p>
              </div>
              <div>
                <p className="font-medium mb-1">Банк:</p>
                <p>
                  ЗАО «БСБ Банк», г. Минск, пр-т Победителей, д. 23, корп. 4
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">BIC:</p>
                <p>UNBSBY2X</p>
              </div>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t mt-8 pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2019-{currentYear} Общественное объединение по защите прав
              потребителей "Автопотребитель". Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
