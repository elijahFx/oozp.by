import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronRight, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const news = [
  {
    title: "Новые правила гарантийного обслуживания автомобилей",
    description: "Что изменилось в законодательстве о защите прав потребителей при гарантийном обслуживании автомобилей?",
    date: "10 июня 2025",
    slug: "/news/new-warranty-rules",
    category: "законодательство"
  },
  {
    title: "Как вернуть деньги за некачественный ремонт",
    description: "Пошаговая инструкция по возврату средств за некачественно выполненный ремонт автомобиля.",
    date: "5 июня 2025",
    slug: "/news/refund-for-poor-repair",
    category: "советы"
  },
  {
    title: "Успешное дело против крупного автосалона",
    description: "История успеха: как наш клиент добился справедливости в споре с известным автосалоном.",
    date: "1 июня 2025",
    slug: "/news/successful-case-against-dealer",
    category: "кейсы"
  },
  {
    title: "Особенности предъявления претензий к страховым компаниям",
    description: "Что нужно знать при взаимодействии со страховыми компаниями и как правильно оформить претензию.",
    date: "25 мая 2025",
    slug: "/news/insurance-claims-tips",
    category: "советы"
  },
  {
    title: "Обзор изменений в законе о защите прав потребителей",
    description: "Анализ последних изменений в законодательстве и их влияние на права потребителей автомобильных услуг.",
    date: "20 мая 2025",
    slug: "/news/consumer-protection-law-changes",
    category: "законодательство"
  },
  {
    title: "Верховный суд встал на сторону потребителя в споре с дилером",
    description: "Важный прецедент: анализ решения Верховного суда по делу о возврате автомобиля ненадлежащего качества.",
    date: "15 мая 2025",
    slug: "/news/supreme-court-ruling",
    category: "кейсы"
  }
]

export default function NewsPage() {
  const categories = Array.from(new Set(news.map(item => item.category)))

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Новости и статьи</h1>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Все</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {news.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                {news
                  .filter(article => article.category === category)
                  .map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button variant="outline">
            Загрузить еще
          </Button>
        </div>
      </div>
    </div>
  )
}

function NewsCard({ article }: { article: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {article.date}
            </div>
            <CardTitle className="text-2xl">
              <Link href={article.slug} className="hover:text-primary transition-colors">
                {article.title}
              </Link>
            </CardTitle>
          </div>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <span>{article.category}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-base">
          {article.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={article.slug} passHref>
          <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80">
            Читать полностью
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}