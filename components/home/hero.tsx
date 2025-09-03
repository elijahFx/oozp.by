import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroCarousel from "../carousel/HeroCarousel"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background min-h-screen">
      {/* Фоновая карусель на всю ширину */}
      <HeroCarousel />
      
      {/* Контент поверх изображения */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Общество защиты</span>
              <span className="block text-primary">потребителей</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-xl">
              Защищаем ваши права во всех сферах потребительского рынка. Ваша уверенность - наша работа.
            </p>
            
            {/* Телефон горячей линии и адрес */}
            <div className="mt-8 p-6 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-xl shadow-lg">
              <p className="text-sm text-muted-foreground mb-2">Телефон горячей линии:</p>
              <a 
                href="tel:+375296062598" 
                className="text-2xl sm:text-3xl font-bold text-primary hover:text-primary/80 transition-colors block"
                aria-label="Позвонить по телефону горячей линии +375 29 606 25 98"
              >
                +375 29 606 25 98
              </a>
              <p className="text-xs text-muted-foreground mt-1 mb-4">Telegram, Viber</p>
              
              {/* Адрес */}
              <div className="border-t border-primary/10 pt-4">
                <p className="text-sm text-muted-foreground mb-1">Наш офис:</p>
                <address className="text-sm font-medium text-foreground not-italic">
                  г. Минск, ул. Амураторская, д. 4, 2 этаж, каб. 209
                </address>
              </div>
            </div>
      
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contacts" passHref>
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg">
                  Получить консультацию
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-background/80 backdrop-blur-sm hover:bg-background/90">
                  Узнать больше
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}