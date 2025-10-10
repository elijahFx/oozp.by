"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";

export function HowToUseSection() {
  const steps = [
    {
      number: "1",
      title: "Выберите тип претензии",
      description: "Некачественный товар, услуга, нарушение сроков или возврат качественного товара"
    },
    {
      number: "2",
      title: "Заполните все данные",
      description: "Ваши данные, данные продавца (исполнителя), данные о товаре (услуге), выберите требование"
    },
    {
      number: "3",
      title: "Скачайте готовую претензию",
      description: "У Вас скачивается готовая претензия, которую Вы впоследствии распечатываете и подписываете"
    },
    {
      number: "4",
      title: "Направьте претензию почтой",
      description: "Направляете претензию по адресу, указанному в претензии почтой (Белпочта)"
    },
    {
      number: "5",
      title: "Ожидайте ответа",
      description: "Ожидаете ответа в срок указанный в самом конце претензии (7, 14 или 30 дней в зависимости от типа претензии)"
    }
  ];

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
          Как пользоваться конструктором?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">{step.title}</h3>
                <p className="text-blue-700 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5 text-yellow-700" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Возникли сложности?
              </h4>
              <p className="text-yellow-700 text-sm">
                Набирайте по номеру телефона:{" "}
                <a 
                  href="tel:+375296062598" 
                  className="font-bold hover:underline"
                >
                  +375 (29) 606-25-98
                </a>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}