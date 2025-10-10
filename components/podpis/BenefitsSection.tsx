"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    "Экономия времени и средств на поездки",
    "Возможность получить юридическую помощь из любого места",
    "Безопасность и конфиденциальность данных",
    "Юридическая сила электронных документов",
    "Простота и удобство использования",
    "Мгновенное получение документов"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Преимущества электронной подписи</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}