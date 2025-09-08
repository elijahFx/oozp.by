import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Metadata } from "next"
import ContactForm from "@/components/oozpappeals/ContactForm"

export const metadata: Metadata = {
  title: "Контакты | Автопотребитель - свяжитесь с нами",
  description: "Контактная информация общественного объединения по защите прав потребителей. Бесплатные консультации, юридическая помощь, защита прав потребителей в Беларуси.",
  keywords: "контакты, защита прав потребителей, юридическая консультация, бесплатная помощь, Минск, Беларусь, контакты организации, запись на прием",
  openGraph: {
    title: "Контакты | Автопотребитель - защита прав потребителей",
    description: "Свяжитесь с нами для получения бесплатной консультации по защите прав потребителей. Юридическая помощь в Минске и по всей Беларуси.",
    type: "website",
    locale: "ru_BY",
  },
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Контакты</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-xl text-muted-foreground mb-6">
              Свяжитесь с нами для консультации или записи на прием. Мы готовы помочь вам защитить ваши права как потребителя автомобильных услуг.
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <h3 className="font-medium">Телефон</h3>
                      <p className="text-muted-foreground mt-1">
                        <a href="tel:+375296062598" className="hover:text-primary transition-colors">
                          +375 29 606 25 98
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <h3 className="font-medium">Адрес</h3>
                      <p className="text-muted-foreground mt-1">
                        220004, г. Минск, ул. Амураторская, д. 4, 2 этаж, каб. 209
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground mt-1">
                        <a href="mailto:legal@oozp.by" className="hover:text-primary transition-colors">
                          legal@oozp.by
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <h3 className="font-medium">Время работы</h3>
                      <p className="text-muted-foreground mt-1">
                        Понедельник - Пятница: 9:00 - 20:00<br />
                        Суббота: выходной<br />
                        Воскресенье: выходной
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
                <CardDescription>
                  Заполните форму и мы свяжемся с вами в ближайшее время
                </CardDescription>
              </CardHeader>


              <ContactForm />
            {/*   <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        Имя
                      </label>
                      <Input id="first-name" placeholder="Иван" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Фамилия
                      </label>
                      <Input id="last-name" placeholder="Иванов" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="example@mail.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Телефон
                    </label>
                    <Input id="phone" placeholder="+375 XX XXX XX XX" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Сообщение
                    </label>
                    <Textarea id="message" placeholder="Опишите вашу проблему..." rows={5} />
                  </div>
                  
                  <Button type="submit" className="w-full">Отправить</Button>
                </form>
              </CardContent>

              */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}