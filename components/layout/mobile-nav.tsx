import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, Phone, MessageCircle } from 'lucide-react'

export default function MobileNav({ navigation }: { navigation: { name: string, href: string }[] }) {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Открыть меню</span>
          </Button>
        </summary>
        
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-lg shadow-lg p-4 z-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight">ООЗП.BY</span>
              </Link>
            </div>
            
            <nav className="flex flex-col space-y-4" role="navigation" aria-label="Мобильная навигация">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className="px-3 py-2 text-base rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-6 border-t space-y-4">
              <a 
                href="tel:+375296062598" 
                className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Позвонить по телефону +375 29 606 25 98"
              >
                <Phone size={18} />
                <span>+375 29 606 25 98</span>
              </a>
              <div className="px-3 space-y-2">
                <a 
                  href="https://t.me/+375296062598"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Написать в Telegram"
                >
                  <MessageCircle size={18} />
                  <span>Telegram</span>
                </a>
                <a 
                  href="viber://chat?number=%2B375296062598"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Написать в Viber"
                >
                  <MessageCircle size={18} />
                  <span>Viber</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  )
}