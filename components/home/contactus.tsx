import { Phone, Mail, MessageCircle, Instagram, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const contactMethods = [
  {
    title: 'Телефон',
    description: 'Позвоните нам для консультации',
    value: '+375 (29) 606-25-98',
    icon: Phone,
    href: 'tel:+375296062598',
    type: 'phone',
    bgColor: 'bg-blue-50/80',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white'
  },
  {
    title: 'Электронная почта',
    description: 'Напишите нам на почту',
    value: 'legal@oozp.by',
    icon: Mail,
    href: 'mailto:legal@oozp.by',
    type: 'email',
    bgColor: 'bg-red-50/80',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    buttonColor: 'bg-red-500 hover:bg-red-600 text-white'
  },
  {
    title: 'Viber',
    description: 'Напишите нам в Viber',
    value: 'Написать в Viber',
    icon: MessageCircle,
    href: 'viber://chat?number=%2B375296062598',
    type: 'viber',
    bgColor: 'bg-purple-50/80',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-500',
    buttonColor: 'bg-purple-500 hover:bg-purple-600 text-white'
  },
  {
    title: 'Telegram',
    description: 'Напишите нам в Telegram',
    value: 'Написать в Telegram',
    icon: MessageCircle,
    href: 'https://t.me/avtopotreb',
    type: 'telegram',
    bgColor: 'bg-sky-50/80',
    borderColor: 'border-sky-200',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-500',
    buttonColor: 'bg-sky-500 hover:bg-sky-600 text-white'
  },
  {
    title: 'WhatsApp',
    description: 'Напишите нам в WhatsApp',
    value: 'Написать в WhatsApp',
    icon: MessageSquare,
    href: 'https://wa.me/375296062598',
    type: 'whatsapp',
    bgColor: 'bg-green-50/80',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    buttonColor: 'bg-green-500 hover:bg-green-600 text-white'
  },
  {
    title: 'Instagram',
    description: 'Подпишитесь на нас в Instagram',
    value: 'Наш Instagram',
    icon: Instagram,
    href: 'https://instagram.com/oozp.by',
    type: 'instagram',
    bgColor: 'bg-pink-50/80',
    borderColor: 'border-pink-200',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    buttonColor: 'bg-pink-500 hover:bg-pink-600 text-white'
  }
]

export default function ContactUs() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Как с нами можно связаться?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Выберите удобный способ связи - мы всегда готовы помочь вам в защите ваших прав
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((contact, index) => (
            <Card 
              key={index} 
              className={`border ${contact.borderColor} ${contact.bgColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
            >
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-xl ${contact.iconBg} flex items-center justify-center mb-4`}>
                  <contact.icon className={`h-6 w-6 ${contact.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{contact.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {contact.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link 
                  href={contact.href}
                  className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${contact.buttonColor}`}
                  target={contact.type !== 'phone' && contact.type !== 'email' ? '_blank' : '_self'}
                >
                  <contact.icon className="h-4 w-4 mr-2" />
                  {contact.value}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}