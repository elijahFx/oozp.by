"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, Calendar, Phone, Mail } from "lucide-react";

export default function ComingSoon() {
  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Construction className="h-6 w-6" />
          Сервис скоро будет доступен
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-orange-700">
            В настоящее время мы активно работаем над созданием удобного и безопасного 
            сервиса электронной подписи для дистанционного заключения договоров.
          </p>
          
          <div className="bg-white/50 rounded-lg p-4 border border-orange-100">
            <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Что будет доступно:
            </h4>
            <ul className="text-orange-700 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                Онлайн-заключение договоров безвозмездных юридических услуг
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                Простая и безопасная электронная подпись
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                Мгновенное получение подписанных документов
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                Полное соответствие законодательству РБ
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-200 pt-4">
          <h4 className="font-semibold text-orange-800 mb-3">Свяжитесь с нами:</h4>
          <div className="space-y-2 text-sm">
            <a 
              href="tel:+375296062598"
              className="flex items-center gap-2 text-orange-700 hover:text-orange-800 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +375 (29) 606-25-98
            </a>
            <a 
              href="mailto:legal@oozp.by"
              className="flex items-center gap-2 text-orange-700 hover:text-orange-800 transition-colors"
            >
              <Mail className="h-4 w-4" />
              legal@oozp.by
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}