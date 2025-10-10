"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { dateHandler, formatNumberInput } from "@/lib/eventHandlers";

interface ProductServiceSectionProps {
  claimType: string;
}

export function ProductServiceSection({ claimType }: ProductServiceSectionProps) {
  const getPlaceholder = () => {
    switch (claimType) {
      case "nekachTov":
        return "Пылесос iPhone 11 (2021 г.)";
      case "srokiTov":
        return "Пылесос Bosch X01-02";
      case "vozvrat":
        return "Телефон iPhone 11 (2021 г.)";
      case "srokiUsl":
        return "Услуга по ремонту телефона";
      case "otkaz":
        return "Осуществить работы по ремонту телефона, оказать медицинские услуги...";
      default:
        return "Осуществить работы по ремонту телефона, оказать медицинские услуги...";
    }
  };

  const getLabel = () => {
    switch (claimType) {
      case "vozvrat":
      case "nekachTov":
      case "srokiTov":
        return "Наименование товара:";
      case "srokiUsl":
        return "Наименование услуги:";
      case "otkaz":
        return "Предмет договора:";
      default:
        return "Какие работы (услуги) обязался реализовать Вам исполнитель:";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о товаре/услуге</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {claimType !== "nekachUsl" && (
          <div>
            <Label htmlFor="good">{getLabel()}</Label>
            <Input id="good" placeholder={getPlaceholder()} />
          </div>
        )}

        <div>
          <Label htmlFor="price">
            {claimType === "nekachTov" ||
            claimType === "srokiTov" ||
            claimType === "vozvrat"
              ? "Цена товара:"
              : "Стоимость работ (услуг):"}
          </Label>
          <Input
            onBlur={formatNumberInput}
            id="price"
            placeholder="1396,00"
          />
        </div>

        <div>
          <Label htmlFor="date">
            {claimType === "nekachTov" ||
            claimType === "srokiTov" ||
            claimType === "vozvrat"
              ? "Дата покупки товара:"
              : "Дата заключения договора выполнения работ (оказания услуг):"}
          </Label>
          <Input
            id="date"
            onInput={dateHandler}
            placeholder="01.12.2023"
          />
        </div>

        {claimType === "nekachTov" && (
          <div>
            <Label htmlFor="complaint">Недостатки товара:</Label>
            <Textarea
              id="complaint"
              placeholder="Не работает интернет, камера не работает"
            />
          </div>
        )}

        {claimType === "nekachUsl" && (
          <div>
            <Label htmlFor="complaint">
              Недостатки выполненной работы (оказанной услуги):
            </Label>
            <Textarea
              id="complaint"
              placeholder="Телефон после ремонта не включается, зубы после лечения очень сильно болят"
            />
          </div>
        )}

        {(claimType === "srokiUsl" || claimType === "srokiTov") && (
          <div>
            <Label htmlFor="deadline">
              {claimType === "srokiUsl"
                ? "Оговоренный срок оказания услуг (выполнения работ):"
                : "Дата согласованной доставки товара:"}
            </Label>
            <Input
              id="deadline"
              onInput={dateHandler}
              placeholder="22.01.2023"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}