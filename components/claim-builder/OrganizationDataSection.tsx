"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { keypressUnpHandler, unpHandler } from "@/lib/eventHandlers";

export function OrganizationDataSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Данные организации</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="orgName">
            Наименование Вашего продавца, исполнителя:
          </Label>
          <Input id="orgName" placeholder="ООО ИМВБРБ" />
        </div>
        <div>
          <Label htmlFor="unp">УНП (Учетный номер плательщика):</Label>
          <Input
            id="unp"
            onKeyUp={keypressUnpHandler}
            onInput={unpHandler}
            placeholder="123456789"
            maxLength={9}
          />
        </div>
        <div>
          <Label htmlFor="orgAddress">
            Юридический адрес Вашего продавца, исполнителя:
          </Label>
          <Input
            id="orgAddress"
            placeholder="220014, г. Минск, ул. Сурганова, д. 36, оф. 305"
          />
        </div>
      </CardContent>
    </Card>
  );
}