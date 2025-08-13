import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronRight } from "lucide-react"

export default function RecentNews() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Новости и статьи</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы готовим для вас полезные статьи и актуальные новости в сфере защиты прав потребителей. 
            Следите за обновлениями!
          </p>
        </div>
      </div>
    </section>
  )
}