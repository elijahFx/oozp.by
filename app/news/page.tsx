import { Suspense } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronRight, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Metadata } from "next"
import { fetchArticles } from "@/lib/api"

export const metadata: Metadata = {
  title: "Новости и статьи | Автопотребитель - полезные материалы",
  description: "Актуальные новости и статьи по защите прав потребителей в Беларуси. Полезные руководства, советы юристов, изменения в законодательстве.",
  keywords: "новости защиты прав потребителей, статьи о правах потребителей, юридические советы, потребительское право, законодательство РБ, полезные материалы",
  openGraph: {
    title: "Новости и статьи о защите прав потребителей | Автопотребитель",
    description: "Актуальные материалы и руководства по защите прав потребителей в различных сферах. Советы юристов и экспертов.",
    type: "website",
    locale: "ru_BY",
  },
};

async function NewsList() {
  const articles = await fetchArticles();

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Поиск статей..."
          className="pl-4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.reverse().map((article) => (
          <Card key={article.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {article.createdAt}
                </div>
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              
            </CardContent>
            <CardFooter>
              <Link href={`/news/${article.url || article.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  Читать далее
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {articles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Статьи не найдены</h3>
          <p className="text-muted-foreground">
            В данный момент статьи загружаются или отсутствуют.
          </p>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-muted rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="h-6 bg-muted rounded w-20 animate-pulse" />
                <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              </div>
              <div className="h-6 bg-muted rounded w-full animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-muted rounded w-16 animate-pulse" />
                <div className="h-6 bg-muted rounded w-20 animate-pulse" />
                <div className="h-6 bg-muted rounded w-18 animate-pulse" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-muted rounded w-full animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Новости и статьи</h1>
        
        <Suspense fallback={<LoadingSkeleton />}>
          <NewsList />
        </Suspense>
        
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Больше статей скоро появится</h2>
            <p className="text-muted-foreground mb-6">
              Мы регулярно публикуем полезные материалы по защите прав потребителей. 
              Подписывайтесь на наши обновления!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacts">
                <Button>Получить консультацию</Button>
              </Link>
              <Link href="/claim-builder">
                <Button variant="outline">Конструктор претензий</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}