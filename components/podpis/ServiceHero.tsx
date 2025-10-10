"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileSignature, Clock, Shield, Mail } from "lucide-react";

export default function ServiceHero() {
  const features = [
    {
      icon: <FileSignature className="h-8 w-8" />,
      title: "Дистанционное заключение договоров",
      description: "Заключайте договоры оказания безвозмездных юридических услуг онлайн"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Юридическая сила",
      description: "Электронные документы имеют полную юридическую силу"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Экономия времени",
      description: "Не нужно посещать офис лично"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Мгновенная доставка",
      description: "Документы отправляются сразу после подписания"
    }
  ];

  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
        <FileSignature className="h-4 w-4 mr-2" />
        Сервис в разработке
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight mb-6">
        Электронная подпись
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
        Дистанционное заключение договоров оказания безвозмездных юридических услуг 
        с общественным объединением "Автопотребитель"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="text-center border-2 border-dashed border-blue-200">
            <CardContent className="pt-6">
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}