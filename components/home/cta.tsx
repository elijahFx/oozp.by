import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneCall } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold tracking-tight">
              Нужна помощь с защитой ваших прав?
            </h2>
            <p className="mt-4 text-lg max-w-3xl">
              Свяжитесь с нами для бесплатной консультации. Наши специалисты готовы помочь вам решить любые споры в сфере защиты прав потребителей.
            </p>
          </div>
          <div className="mt-6 md:mt-0 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-start md:items-center">
            <a href="tel:+375296062598">
              <Button variant="secondary" size="lg" className="w-full md:w-auto">
                <PhoneCall className="mr-2 h-4 w-4" />
                +375 29 606 25 98
              </Button>
            </a>
            <Link href="/contacts" passHref>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary w-full md:w-auto">
                Контакты
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}