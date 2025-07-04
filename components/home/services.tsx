import { 
  FileText, 
  FileEdit, 
  Scale, 
  HelpCircle,
  Home,
  Building2,
  Banknote,
  ShieldCheck,
  Store,
  HeartPulse
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

const services = [
  {
    title: 'Жилищно-коммунальные услуги',
    description: 'Помощь в разрешении споров с поставщиками коммунальных услуг и управляющими компаниями.',
    icon: Home,
    image: 'https://images.pexels.com/photos/3958958/pexels-photo-3958958.jpeg'
  },
  {
    title: 'Долевое строительство',
    description: 'Защита прав дольщиков, споры с застройщиками, проверка документации.',
    icon: Building2,
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg'
  },
  {
    title: 'Банковские услуги',
    description: 'Разрешение споров с банками по кредитам, вкладам и другим финансовым продуктам.',
    icon: Banknote,
    image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg'
  },
  {
    title: 'Страховые споры',
    description: 'Помощь в получении страховых выплат и разрешении споров со страховыми компаниями.',
    icon: ShieldCheck,
    image: 'https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg'
  },
  {
    title: 'Защита потребителей',
    description: 'Споры по качеству товаров и услуг, возврат средств, компенсация ущерба.',
    icon: Store,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
  },
  {
    title: 'Ветеринарные споры',
    description: 'Разрешение конфликтов с ветеринарными клиниками и зоомагазинами.',
    icon: HeartPulse,
    image: 'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg'
  }
]

const legalServices = [
  {
    title: 'Подготовка претензий',
    description: 'Профессиональная подготовка претензий и досудебных документов.',
    icon: FileText
  },
  {
    title: 'Написание исков',
    description: 'Составление исковых заявлений с учетом специфики вашего дела.',
    icon: FileEdit
  },
  {
    title: 'Представление в суде',
    description: 'Защита ваших интересов во всех судебных инстанциях.',
    icon: Scale
  },
  {
    title: 'Бесплатные консультации',
    description: 'Первичная оценка перспектив дела и разъяснение ваших прав.',
    icon: HelpCircle
  }
]

export default function Services() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Направления деятельности</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Мы специализируемся на защите прав потребителей во всех сферах потребительского рынка
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-0 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <CardHeader className="relative pb-2">
                <div className="absolute -top-8 left-6 w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mt-8">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Юридические услуги</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalServices.map((service, index) => (
              <Card key={index} className="border-0 bg-primary/5 hover:bg-primary/10 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}