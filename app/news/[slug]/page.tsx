import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Article {
  title: string;
  date: string;
  content: string;
  tags?: string[];
}

interface Articles {
  [key: string]: Article;
}
// This would typically come from a database or CMS
const articles: Articles = {
  "supreme-court-ruling": {
    title: "Supreme Court Ruling Analysis",
    date: "2025-08-28",
    content: "Detailed analysis of the recent Supreme Court ruling and its implications...",
  },
  "apartment-flooding-guide": {
    title: "Порядок действий при залитии квартиры: как защитить свои права",
    date: "28.08.2025",
    content: `С ситуацией залития квартиры может столкнуться каждый. Независимо от того, произошел ли залив по вине соседей или из-за неисправности общедомового имущества, важно действовать грамотно и последовательно, чтобы защитить свои права и получить возмещение причиненного ущерба.

## 🚨 Первоочередные действия при залитии

Остановите залитие. Если вода продолжает поступать, необходимо немедленно перекрыть воду в квартире-источнике или на стояке. Если доступ к источнику затопления невозможен, срочно свяжитесь с аварийной службой вашей управляющей организации (ЖЭУ, ЖКХ) или единой службой 115. Аварийная служба обязана оперативно отреагировать и перекрыть воду.

Предупредите дальнейшие повреждения. Отключите электропитание в поврежденных помещениях, чтобы избежать короткого замыкания и поражения током. По возможности переместите ценные вещи в безопасное место.

Зафиксируйте факт залива. До приезда комиссии сфотографируйте или снимите на видео все последствия залива: поврежденные стены, потолок, пол, мебель, бытовую технику и другие испорченные вещи. Эти материалы станут важными доказательствами.

## 📋 Обращение в управляющую организацию и составление акта

Вызовите комиссию для составления акта. Немедленно сообщите о происшествии в вашу управляющую организацию (ЖЭУ, ЖКХ). К вам должна выехать комиссия, в которую обычно входят представители ЖЭУ и, по возможности, виновник залива (например, сосед сверху).

Акт о заливе – это ключевой документ для дальнейшего возмещения ущерба. Проследите, чтобы в акте были указаны:
- Дата, время и причина залива
- Перечень всех повреждений и испорченного имущества
- Установленный виновник происшествия
- Подписи всех членов комиссии и ваша подпись

Внимательно ознакомьтесь с актом. Если вы не согласны с каким-либо пунктом, внесите свои замечания непосредственно в документ перед подписанием.

## 📄 Направление претензии виновнику

Если виновником залива является сосед или управляющая организация, следующий шаг – направить им официальную письменную претензию с требованиями о возмещении ущерба.

Претензия должна содержать:
- Данные виновника и ваши данные
- Подробное описание обстоятельств залива со ссылкой на составленный акт
- Требование о возмещении причиненного ущерба
- Требование об устранении недостатка жилищно-коммунальной услуги
- Требование о компенсации морального вреда (по желанию)

Претензию необходимо направить заказным письмом с уведомлением о вручении.

## 🔍 Оценка ущерба и документы

Для обоснования суммы возмещения рекомендуется провести независимую оценку ущерба. Для оценки вам потребуются:
- Акт о заливе
- Правоустанавливающие документы на квартиру
- Технический паспорт БТИ
- Чеки, квитанции и другие документы, подтверждающие стоимость испорченного имущества

## ⚖️ Правовое регулирование

Защита прав потребителей жилищно-коммунальных услуг в Республике Беларусь регулируется:
- Законом Республики Беларусь от 9 января 2002 г. № 90-З "О защите прав потребителей"
- Законом Республики Беларусь от 16 июля 2008 г. № 405-З "О защите прав потребителей жилищно-коммунальных услуг"

## 🚀 Что делать, если виновник отказывается возмещать ущерб?

Если досудебное урегулирование не дало результатов, вы вправе обратиться с исковым заявлением в суд. К иску необходимо приложить все собранные документы.
`,
    tags: ["залив квартиры", "защита прав потребителей ЖКУ", "возмещение ущерба"]
  },
  "new-warranty-rules": {
    title: "Новые правила гарантийного обслуживания автомобилей",
    date: "10 июня 2025",
    content: "Что изменилось в законодательстве о защите прав потребителей при гарантийном обслуживании автомобилей..."
  },
  "refund-for-poor-repair": {
    title: "Как вернуть деньги за некачественный ремонт",
    date: "5 июня 2025",
    content: "Пошаговая инструкция по возврату средств за некачественно выполненный ремонт автомобиля..."
  },
  "successful-case-against-dealer": {
    title: "Успешное дело против крупного автосалона",
    date: "1 июня 2025",
    content: "История успеха: как наш клиент добился справедливости в споре с известным автосалоном..."
  },
  "insurance-claims-tips": {
    title: "Особенности предъявления претензий к страховым компаниям",
    date: "25 мая 2025",
    content: "Что нужно знать при взаимодействии со страховыми компаниями и как правильно оформить претензию..."
  },
  "consumer-protection-law-changes": {
    title: "Обзор изменений в законе о защите прав потребителей",
    date: "20 мая 2025",
    content: "Анализ последних изменений в законодательстве и их влияние на права потребителей автомобильных услуг..."
  }
};

type PageParams = {
  slug: string;
};

export function generateStaticParams(): Promise<PageParams[]> {
  return Promise.resolve(
    Object.keys(articles).map((slug) => ({ slug }))
  );
}

interface PageProps {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function NewsArticle({ params }: PageProps) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-900">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {paragraph.replace(/\*\*/g, '')}
          </strong>
        );
      }
      
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      
      if (paragraph.includes('+375')) {
        return (
          <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
            <p className="text-blue-800 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {paragraph}
            </p>
          </div>
        );
      }
      
      return (
        <p key={index} className="text-gray-700">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-black-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Хлебные крошки */}
        <nav className="mb-8">
          <Link 
            href="/news" 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Назад к статьям
          </Link>
        </nav>

        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-black text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                {article.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w- h-5" />
                <time className="text-sm font-medium">
                  {article.date}
                </time>
              </div>
            </div>
            
            {article.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-white/20 text-white border-0 hover:bg-white/30"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">

 <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/news/zalit2.webp"
                alt="Последствия залития квартиры"
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>


            <article className="prose prose-lg max-w-none">
              <div className="text-gray-700 ">
                {formatContent(article.content)}
              </div>
            </article>
            
            {/* Призыв к действию */}
            <div className="mt-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Нужна помощь специалиста?
              </h3>
              <p className="text-gray-700 mb-4">
                Не оставайтесь с проблемой один на один! Наши юристы помогут вам защитить ваши права.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+375296062598"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +375 (29) 606-25-98
                </a>
                <span className="text-sm text-gray-600 self-center">
                  или напишите в Viber/Telegram
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}