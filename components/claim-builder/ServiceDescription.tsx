import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Clock, DollarSign, GraduationCap } from "lucide-react";

export function ServiceDescription() {
  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Автоматический",
      description: "Система автоматически генерирует юридически корректный документ"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Быстро",
      description: "Составьте претензию всего за 5 минут без сложных процедур"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Бесплатно",
      description: "Полностью бесплатный сервис без скрытых платежей"
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Просто",
      description: "Доступно для каждого без юридического образования"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 mb-8">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          Что это за сервис?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Наш конструктор претензий — это современный автоматический инструмент, 
          который позволяет <strong>любому человеку</strong> без юридического образования 
          составить профессиональную претензию всего за <strong>5 минут</strong>.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-3 bg-white/50 rounded-lg border border-white"
            >
              <div className="text-green-600 mb-2">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/70 rounded-lg p-3 border border-green-100">
          <p className="text-gray-700 text-xs text-center">
            <strong>Просто заполните форму</strong> — система сама создаст готовый к отправке документ 
            с учётом всех требований законодательства РБ
          </p>
        </div>
      </CardContent>
    </Card>
  );
}