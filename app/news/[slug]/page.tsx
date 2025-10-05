import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, AlertTriangle, FileText, Mail, Send, ClipboardList, Scale, ArrowLeft, ArrowRight } from "lucide-react";
import Contacts from "@/components/contacts/contacts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { fetchArticleById, fetchNextArticleId } from "@/lib/api"; // Предполагаем, что есть функция для получения следующей статьи

type PageParams = {
  slug: string;
};

interface PageProps {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const article = await fetchArticleById(slug);
  
  if (!article) {
    return {
      title: "Статья не найдена | Автопотребитель",
    };
  }

  return {
    title: `${article.title} | Автопотребитель`,
    description: article.description,
    keywords: `${article.title}, ${article.category}, ${article.tags.join(', ')}`,
    openGraph: {
      title: article.title,
      description: article.description || '',
      type: "article",
      locale: "ru_BY",
      images: article.img || article.imgPath ? [{ url: article.img || article.imgPath || '' }] : undefined,
    },
  };
}

export default async function NewsArticle({ params }: PageProps) {
  const { slug } = params;
  const article = await fetchArticleById(slug);
  const nextArticleId = await fetchNextArticleId(slug); // Получаем ID следующей статьи

  if (!article) {
    notFound();
  }

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    const elements = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Пропускаем пустые строки
      if (line === '') continue;
      
      // Заголовки второго уровня
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }
      
      // Важные блоки
      if (line.includes('ВАЖНО:') || line.includes('❗') || line.includes('Важно:')) {
        elements.push(
          <div key={i} className="bg-amber-50 p-4 my-4 rounded-lg border-l-4 border-amber-500">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <strong className="text-amber-900">{line}</strong>
            </div>
          </div>
        );
        continue;
      }
      
      // Списки с маркерами • 
      if (line.startsWith('• ')) {
        const listItems = [line.replace(/^• /, '')];
        
        // Собираем все последующие элементы списка
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('• ')) {
          i++;
          listItems.push(lines[i].trim().replace(/^• /, ''));
        }
        
        elements.push(
          <ul key={i} className="list-disc pl-5 my-4 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700 text-lg">
                {item}
              </li>
            ))}
          </ul>
        );
        continue;
      }
      
      // Списки с буквами o 
      if (line.startsWith('o ')) {
        const listItems = [line.replace(/^o /, '')];
        
        // Собираем все последующие элементы списка
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('o ')) {
          i++;
          listItems.push(lines[i].trim().replace(/^o /, ''));
        }
        
        elements.push(
          <ul key={i} className="list-[circle] pl-5 my-4 space-y-2 ml-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700 text-lg">
                {item}
              </li>
            ))}
          </ul>
        );
        continue;
      }
      
      // Нумерованные шаги (жирный текст с цифрами)
      if (line.startsWith('**') && line.endsWith('**') && line.match(/\d+\./)) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3 flex items-start">
            <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
              {line.match(/\d+/)?.[0]}
            </span>
            <span>{line.replace(/\*\*/g, '')}</span>
          </h3>
        );
        continue;
      }
      
      // Эмодзи в начале строки (для разделов типа ⚖️)
      if (line.match(/^[⚖️🔧📋📝]/)) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3 flex items-center">
            <span className="mr-2">{line.charAt(0)}</span>
            <span>{line.slice(1).trim()}</span>
          </h3>
        );
        continue;
      }
      
      // Обычные параграфы
      elements.push(
        <p key={i} className="text-gray-700 text-lg leading-7 mb-4">
          {line}
        </p>
      );
    }
    
    return elements;
  };

  const imageUrl = article.img || article.imgPath;
  
  // Определяем тип статьи для специального форматирования
  const isConsumerRightsArticle = article.tags?.some(tag => 
    ['wildberries', 'маркетплейс', 'потребитель'].includes(tag.toLowerCase())
  );
  
  const isHousingArticle = article.tags?.some(tag => 
    ['жилье', 'залитие квартиры', 'залитие', 'квартира'].includes(tag.toLowerCase())
  );

   return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Хлебные крошки с кнопками навигации */}
        <nav className="mb-6 sm:mb-8 flex justify-between items-center">
          <Link 
            href="/news" 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 text-sm sm:text-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к статьям
          </Link>
          
          {nextArticleId && (
            <Link 
              href={`/news/${nextArticleId}`}
              className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 text-sm sm:text-base transition-colors"
            >
              К следующей статье
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </nav>

        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
          <CardHeader className={`${isHousingArticle ? 'bg-gradient-to-r from-teal-900 to-teal-700' : 'bg-gradient-to-r from-blue-900 to-blue-700'} text-white p-6 sm:p-8`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                {article.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-5 h-5" />
                <time className="text-sm font-medium">
                  {article.createdAt}
                </time>
              </div>
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-6 sm:p-8">
            {imageUrl && (
              <div className="mb-6 sm:mb-8 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt={article.title || "Защита прав потребителей"}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}

            <article className="max-w-none">
              <div className="space-y-6">
                {formatContent(article.content || "По какой-то причине нам не удалось загрузить статью :(")}
                
                {/* Специальные блоки для статей о правах потребителей */}
                {isConsumerRightsArticle && (
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Как отправить претензию?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Почтовое отправление
                        </h4>
                        <p className="text-sm text-gray-700">
                          Отправьте заказное письмо с уведомлением на юридический адрес.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Электронная почта
                        </h4>
                        <p className="text-sm text-gray-700">
                          Отправьте претензию на официальный email-адрес компании.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Специальные блоки для статей о ЖКХ и залитиях */}
                {isHousingArticle && (
                  <>
                    <div className="bg-teal-50 p-6 rounded-lg border border-teal-200 mt-6">
                      <h3 className="text-xl font-semibold text-teal-900 mb-4 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" />
                        Ключевые документы для составления
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li className="text-teal-800 font-medium">Акт обследования по факту залития</li>
                        <li className="text-teal-800 font-medium">Дефектный акт</li>
                        <li className="text-teal-800 font-medium">Фото и видео доказательства</li>
                        <li className="text-teal-800 font-medium">Чеки на испорченное имущество</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <Scale className="w-5 h-5" />
                        Правовая основа
                      </h3>
                      <p className="text-gray-700 mb-3">
                        Защита прав потребителей жилищно-коммунальных услуг регулируется:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li className="text-gray-700 text-sm">Законом Республики Беларусь "О защите прав потребителей"</li>
                        <li className="text-gray-700 text-sm">Законом Республики Беларусь "О защите прав потребителей жилищно-коммунальных услуг"</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </article>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Contacts />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}