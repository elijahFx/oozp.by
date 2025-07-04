import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    content: "Благодаря 'Автопотребителю' я смог вернуть деньги за некачественный ремонт в автосервисе. Профессиональный подход и отличное знание законодательства!",
    author: "Александр К.",
    initials: "АК"
  },
  {
    content: "Обратилась с проблемой отказа автосалона принять бракованный автомобиль обратно. Сотрудники объединения помогли составить претензию и представляли мои интересы в суде. Результат — полный возврат средств!",
    author: "Елена С.",
    initials: "ЕС"
  },
  {
    content: "Профессиональная юридическая поддержка на всех этапах решения проблемы с дилерским центром. Рекомендую всем, кто столкнулся с нарушением прав потребителя.",
    author: "Виктор Д.",
    initials: "ВД"
  }
]

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Отзывы клиентов</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Узнайте, что говорят люди, которым мы помогли защитить их права
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}