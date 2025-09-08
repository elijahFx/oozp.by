import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";
import Contacts from "@/components/contacts/contacts";
import ScrollToTopButton from "@/components/scroll/ScrollToTopButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { fetchArticleById } from "@/lib/api";

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
      
      // Обработка важных моментов (серый фон, жирный текст)
      if (paragraph.includes('ВАЖНО:') || paragraph.includes('Важно:')) {
        return (
          <div key={index} className="bg-gray-100 p-4 my-4 rounded-lg border-l-4 border-gray-400">
            <strong className="text-gray-900">{paragraph}</strong>
          </div>
        );
      }

      return (
        <p key={index} className="text-gray-700 text-xl">
          {paragraph}
        </p>
      );
    });
  };

  const imageUrl = article.img || article.imgPath;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6 sm:mb-8">
          <Link 
            href="/news" 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 text-sm sm:text-base transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Назад к статьям
          </Link>
        </nav>

        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gray-900 text-white p-6 sm:p-8">
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

            <article className="prose prose-lg max-w-none">
              <div className="text-gray-700 space-y-4">
                {formatContent(article.content || "По какой-то причине нам не удалось загрузить статью :(") }
              </div>
            </article>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Contacts />
            </div>
          </CardContent>
        </Card>
        
        <ScrollToTopButton />
      </div>
    </div>
  );
}