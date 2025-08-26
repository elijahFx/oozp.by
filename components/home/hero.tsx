import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 bg-background/80 backdrop-blur-sm pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-background lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <span className="inline-block text-primary font-semibold tracking-wide uppercase mb-4">Общественное объединение по защите прав потребителей "Автопотребитель"</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Общество защиты</span>{' '}
                <span className="block text-primary xl:inline">потребителей</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Защищаем ваши права во всех сферах потребительского рынка. Ваша уверенность - наша работа.
              </p>
              
              {/* Телефон горячей линии */}
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Телефон горячей линии:</p>
                <a 
                  href="tel:+375296062598" 
                  className="text-2xl sm:text-3xl font-bold text-primary hover:text-primary/80 transition-colors"
                  aria-label="Позвонить по телефону горячей линии +375 29 606 25 98"
                >
                  +375 29 606 25 98
                </a>
                <p className="text-xs text-muted-foreground mt-1">Telegram, Viber</p>
              </div>
              
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link href="/contacts" passHref>
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Получить консультацию
                  </Button>
                </Link>
                <Link href="/about" passHref>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto mt-3 sm:mt-0">
                    Узнать больше
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          <Image
            src="/imgs/minsk.webp"
            alt="Защита прав потребителей"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
        </div>
      </div>
    </div>
  )
}