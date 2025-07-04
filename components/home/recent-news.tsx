import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronRight } from "lucide-react"

const articles = [
  {
    title: "Новые правила гарантийного обслуживания автомобилей",
    description: "Что изменилось в законодательстве о защите прав потребителей при гарантийном обслуживании автомобилей?",
    date: "10 июня 2025",
    slug: "/news/new-warranty-rules"
  },
  {
    title: "Как вернуть деньги за некачественный ремонт",
    description: "Пошаговая инструкция по возврату средств за некачественно выполненный ремонт автомобиля.",
    date: "5 июня 2025",
    slug: "/news/refund-for-poor-repair"
  },
  {
    title: "Успешное дело против крупного автосалона",
    description: "История успеха: как наш клиент добился справедливости в споре с известным автосалоном.",
    date: "1 июня 2025",
    slug: "/news/successful-case-against-dealer"
  }
]

export default function RecentNews() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Последние новости и статьи</h2>
          <Link href="/news" passHref>
            <Button variant="ghost" className="hidden sm:flex items-center">
              Все новости
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {article.date}
                </div>
                <CardTitle className="text-xl">
                  <Link href={article.slug} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {article.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Link href={article.slug} passHref>
                  <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80">
                    Читать далее
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" passHref>
            <Button variant="outline">
              Все новости и статьи
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}