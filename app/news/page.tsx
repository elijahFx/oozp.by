import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronRight, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Metadata } from "next"

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

const news = [
  {
    id: "apartment-flooding-guide",
    title: "Порядок действий при залитии квартиры: как защитить свои права",
    description: "Подробное руководство по защите прав при затоплении квартиры: от первоочередных действий до получения компенсации.",
    date: "29.08.2025",
    category: "ЖКУ",
    tags: ["залитие квартиры", "защита прав потребителей ЖКУ", "возмещение ущерба", "жилищно-коммунальные услуги"],
    featured: true
  },
  {
    id: "wildberries",
    title: "Что делать, если на пункте выдачи Вы получили бракованный, поврежденный или не соответствующий заказу товар на Wildberries?",
    description: "Подробное руководство по защите прав при покупке товара с недостатками на Wildberries",
    date: "29.08.2025",
    category: "Маркетплейсы",
    tags: ["wildberries", "маркетплейсы", "некачественный товар на Wildberries"],
    featured: true
  },
  /*{
    id: "construction",
    title: "Что делать, если на пункте выдачи Вы получили бракованный, поврежденный или не соответствующий заказу товар на Wildberries?",
    description: "Подробное руководство по защите прав при покупке товара с недостатками на Wildberries",
    date: "03.09.2025",
    category: "Долевое строительство",
    tags: ["долевое строительство", "некачественное строительство", "некачественная застройка"],
    featured: true
  }*/
]

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Новости и статьи</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <Card key={article.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {article.date}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/news/${article.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Читать далее
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
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