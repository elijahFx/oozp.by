"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClaimTypeSectionProps {
  claimType: string;
  setClaimType: (value: string) => void;
  setMainRequirement: (value: string) => void;
  setShowAdditionalRequirement: (value: boolean) => void;
  setShowSorazm: (value: boolean) => void;
  setShowVozm: (value: boolean) => void;
}

export function ClaimTypeSection({
  claimType,
  setClaimType,
  setMainRequirement,
  setShowAdditionalRequirement,
  setShowSorazm,
  setShowVozm,
}: ClaimTypeSectionProps) {
  const handleClaimTypeChange = (value: string) => {
    setClaimType(value);
    setMainRequirement("");
    setShowAdditionalRequirement(false);
    setShowSorazm(false);
    setShowVozm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Тип претензии</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleClaimTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип претензии" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nekachTov">Некачественный товар</SelectItem>
            <SelectItem value="nekachUsl">Некачественная услуга</SelectItem>
            <SelectItem value="srokiTov">
              Нарушение сроков передачи оплаченного товара
            </SelectItem>
            <SelectItem value="srokiUsl">
              Нарушение сроков оказания услуг
            </SelectItem>
            <SelectItem value="otkaz">
              Односторонний отказ от договора
            </SelectItem>
            <SelectItem value="vozvrat">Возврат качественного товара</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}