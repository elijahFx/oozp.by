import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Phone, Scale, AlertCircle, CheckCircle, FileSearch, Clock } from "lucide-react"

const steps = [
  {
    title: "Выявление нарушения",
    description: "Определите, в чем заключается нарушение ваших прав как потребителя автомобильных услуг",
    icon: AlertCircle
  },
  {
    title: "Сбор доказательств",
    description: "Соберите все документы, подтверждающие покупку, ремонт, а также факт нарушения прав (чеки, договоры, фото/видео, заключения экспертов)",
    icon: FileSearch
  },
  {
    title: "Консультация специалиста",
    description: "Обратитесь в наше объединение для получения бесплатной консультации по вашему случаю",
    icon: Phone
  },
  {
    title: "Составление претензии",
    description: "Составьте претензию самостоятельно, используя наши образцы, или обратитесь за помощью к нашим специалистам",
    icon: FileText
  },
  {
    title: "Подача претензии",
    description: "Направьте претензию в компанию, нарушившую ваши права, заказным письмом с уведомлением или вручите лично под подпись",
    icon: CheckCircle
  },
  {
    title: "Ожидание ответа",
    description: "По закону, на рассмотрение претензии отводится 14 дней, в течение которых должно быть принято решение",
    icon: Clock
  },
  {
    title: "Обращение в суд",
    description: "Если претензия не удовлетворена или оставлена без ответа, подготовьте исковое заявление в суд",
    icon: Scale
  }
]

export default function AppealProcedurePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Порядок обращений</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <p>
            Защита прав потребителей в автомобильной сфере имеет свои особенности. На этой странице мы рассмотрим пошаговый алгоритм действий при нарушении ваших прав.
          </p>
        </div>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-border/50 z-0"></div>
              )}
              <Card className="relative z-10">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Шаг {index + 1}: {step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Важные моменты</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>Сроки исковой давности по защите прав потребителей составляют 3 года с момента обнаружения недостатка</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>Потребители освобождены от уплаты государственной пошлины при подаче исков, если цена иска не превышает 1 000 000 рублей</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>При обращении в суд вы можете требовать не только возмещения материального ущерба, но и компенсации морального вреда</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>В случае удовлетворения иска суд взыскивает с ответчика штраф в размере 50% от присужденной суммы за отказ добровольно удовлетворить требования потребителя</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}