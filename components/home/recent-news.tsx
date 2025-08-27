import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronRight } from "lucide-react"

const recentArticles = [
  {
    id: "apartment-flooding-guide",
    title: "Порядок действий при залитии квартиры: как защитить свои права",
    description: "Подробное руководство по защите прав при затоплении квартиры: от первоочередных действий до получения компенсации.",
    date: "15 января 2025",
    category: "ЖКУ"
  }
]

export default function RecentNews() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Новости и статьи</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Полезные статьи и актуальные новости в сфере защиты прав потребителей
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/news/${article.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Читать статью
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/news">
            <Button>
              Все статьи
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}