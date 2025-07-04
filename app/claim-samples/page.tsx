import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

const claimSamples = [
  {
    title: "Претензия на возврат автомобиля ненадлежащего качества",
    description: "Претензия в автосалон с требованием возврата денежных средств за автомобиль с существенными недостатками",
    filename: "pretenziya-vozvrat-avto.docx"
  },
  {
    title: "Претензия на некачественный ремонт автомобиля",
    description: "Претензия в СТО с требованием безвозмездного устранения недостатков, возникших после ремонта",
    filename: "pretenziya-nekachestvenniy-remont.docx"
  },
  {
    title: "Претензия по гарантийному ремонту",
    description: "Претензия дилеру с требованием выполнения гарантийных обязательств по ремонту автомобиля",
    filename: "pretenziya-garantiyniy-remont.docx"
  },
  {
    title: "Претензия на нарушение сроков поставки автомобиля",
    description: "Претензия автосалону в связи с нарушением сроков поставки оплаченного автомобиля",
    filename: "pretenziya-narushenie-srokov-postavki.docx"
  },
  {
    title: "Претензия на возмещение ущерба при ДТП",
    description: "Претензия страховой компании с требованием полного возмещения ущерба по ОСАГО/КАСКО",
    filename: "pretenziya-vozmeschenie-uscherba-dtp.docx"
  },
  {
    title: "Претензия на компенсацию морального вреда",
    description: "Дополнительное требование о компенсации морального вреда при нарушении прав потребителя",
    filename: "pretenziya-moralniy-vred.docx"
  }
]

export default function ClaimSamplesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Образцы претензий</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
          <p>
            На этой странице вы найдете образцы претензий, которые могут быть полезны при защите ваших прав как потребителя автомобильных услуг. Вы можете скачать эти образцы и использовать их как основу для составления собственной претензии.
          </p>
          <p>
            <strong>Внимание!</strong> Данные образцы носят общий характер. Для получения индивидуальной консультации и помощи в составлении претензии, пожалуйста, <Link href="/contacts" className="text-primary hover:underline">свяжитесь с нами</Link>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {claimSamples.map((sample, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{sample.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {sample.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-4 mt-auto">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Скачать образец
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Нужна персональная консультация?</h2>
          <p className="text-muted-foreground mb-6">
            Если вы не нашли подходящий образец или вам требуется индивидуальная помощь в составлении претензии, наши специалисты готовы помочь.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contacts" passHref>
              <Button>Связаться с нами</Button>
            </Link>
            <Link href="/claim-builder" passHref>
              <Button variant="outline">Конструктор претензий</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}