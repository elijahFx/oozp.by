"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  blurPhoneHanlder,
  focusPhoneHandler,
  phoneHandler,
} from "@/lib/eventHandlers";

export function ConsumerDataSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Данные заявителя</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Ваше ФИО:</Label>
          <Input id="name" placeholder="Иванов Иван Иванович" />
        </div>
        <div>
          <Label htmlFor="address">Ваш Адрес:</Label>
          <Input
            id="address"
            placeholder="220014, г. Минск, ул. Сурганова, д. 36, кв. 503"
          />
        </div>
        <div>
          <Label htmlFor="phone">Ваш Телефон:</Label>
          <Input
            id="phone"
            onBlur={blurPhoneHanlder}
            onInput={phoneHandler}
            onFocus={focusPhoneHandler}
            placeholder="+375299999999"
          />
        </div>
      </CardContent>
    </Card>
  );
}