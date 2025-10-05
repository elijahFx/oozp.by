"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    content: "Спасибо ребятам, грамотные специалисты в своем деле!",
    author: "Анна Мельничек",
    initials: "АМ",
    rating: 5,
    date: "26 августа 2025 г."
  },
  {
    content: "Спасибо большое ребятам, очень грамотно проконсультировали, помогли разобраться в проблеме некачественного товара",
    author: "Анастасия",
    initials: "А",
    rating: 5,
    date: "25 августа 2025 г."
  },
  {
    content: `Спасибо большое Глебу за грамотные консультации и сопровождение! Профессионально, максимально корректно. Несравненное ощущение того, что ты не один на один с проблемой. Так держать, успехов!`,
    author: "Elena Levkovich",
    initials: "EL",
    rating: 5,
    date: "10 сентября 2025 г."
  },
  {
    content: "Спасибо большое за консультацию, очень быстро и грамотно мне ответили на мои вопросы, помогли с планом дальнейших действий, рекомендую!!!!",
    author: "Наталья Лютыч",
    initials: "НЛ",
    rating: 5,
    date: "12 сентября 2025 г."
  },
  
]

export default function Testimonials() {
  // Дублируем отзывы для бесконечной прокрутки
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 overflow-hidden bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Отзывы наших клиентов</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Узнайте, что говорят люди, которым мы помогли защитить их права
          </p>
          
          {/* Yandex Reviews Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(5)}
              </div>
              <span className="text-lg font-semibold">{5}/5</span>
              <span className="text-muted-foreground">на основе {testimonials.length} отзывов</span>
            </div>
            <a
              href="https://yandex.by/maps/org/obshchestvo_zashchity_potrebiteley_avtopotrebitel/200450668342/reviews/?ll=27.529708%2C53.910548&z=17"
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="testimonials_all_reviews_yandex"
              className="inline-flex items-center gap-2"
            >
              <Button variant="outline" className="bg-yellow-50 border-yellow-200 hover:bg-yellow-100">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Все отзывы на Яндекс Картах
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Бесконечная прокрутка отзывов */}
      <div className="relative">
        <div className="flex animate-scroll space-x-8">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="flex-shrink-0 w-96 bg-background/90 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300"
              data-track-event={`testimonials_review_view_${index % testimonials.length + 1}`}
            >
              <CardContent className="pt-6 pb-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Review Content */}
                <p className="text-muted-foreground italic text-sm leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
                
                {/* Date */}
                <p className="text-xs text-muted-foreground mb-4">
                  {testimonial.date}
                </p>
              </CardContent>
              
              <CardFooter className="border-t bg-muted/20 pt-4 flex items-center space-x-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">Клиент</p>
                </div>
                
                {/* Yandex Logo */}
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Отзыв с</div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs font-medium">Яндекс</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Градиенты для плавного исчезновения по краям */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Присоединяйтесь к сотням довольных клиентов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+375296062598"
              data-track-event="testimonials_phone_consultation"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                data-track-event="testimonials_get_consultation"
              >
                Получить консультацию
              </Button>
            </a>
            <a
              href="https://yandex.by/maps/org/obshchestvo_zashchity_potrebiteley_avtopotrebitel/200450668342/reviews/?add-review=true&ll=27.529885%2C53.910569&z=18"
              target="_blank"
              rel="noopener noreferrer"
              data-track-event="testimonials_leave_review"
            >
              <Button 
                variant="outline" 
                size="lg"
                data-track-event="testimonials_leave_review_button"
              >
                Оставить отзыв
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}