"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'

export default function MobileNav({ navigation }: { navigation: { name: string, href: string }[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/" 
              className="flex items-center space-x-2"
              onClick={() => setOpen(false)}
            >
              <span className="text-xl font-bold tracking-tight">ООЗП.BY</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-base rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-6 border-t space-y-4">
            <a 
              href="tel:+375293948416" 
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              <Phone size={18} />
              <span>+375 29 394 84 16</span>
            </a>
            <div className="px-3 space-y-2">
              <a 
                href="https://t.me/+375293948416"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={18} />
                <span>Telegram</span>
              </a>
              <a 
                href="viber://chat?number=%2B375293948416"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={18} />
                <span>Viber</span>
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}