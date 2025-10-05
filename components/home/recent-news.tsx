import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronRight } from "lucide-react"
import { fetchArticles } from "@/lib/api"

async function RecentArticlesList() {
  const articles = await fetchArticles();
  const recentArticles = articles.slice(0, 3); // Get first 3 articles

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {recentArticles.reverse().map((article) => (
        <Card 
          key={article.id} 
          className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
          data-track-event={`news_article_card_${article.id}`}
        >
          <CardHeader className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {article.category}
              </span>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {article.createdAt}
              </div>
            </div>
            <CardTitle className="text-xl line-clamp-2 mb-3">{article.title}</CardTitle>
            <CardDescription className="line-clamp-3">
              {article.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link 
              href={`/news/${article.url || article.id}`} 
              className="w-full"
              data-track-event={`news_read_article_${article.id}`}
            >
              <Button 
                variant="outline" 
                className="w-full group"
                data-track-event={`news_read_article_button_${article.id}`}
              >
                Читать статью
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function RecentNews() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Новости и статьи</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Полезные статьи и актуальные новости в сфере защиты прав потребителей
          </p>
        </div>
        
        <RecentArticlesList />
        
        <div className="text-center">
          <Link href="/news" data-track-event="news_view_all_articles">
            <Button 
              className="group"
              data-track-event="news_view_all_articles_button"
            >
              Все статьи
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}