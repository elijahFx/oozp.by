"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { claimOptions } from "@/lib/constructorConfig";
import { formatNumberInput } from "@/lib/eventHandlers";

interface RequirementsSectionProps {
  claimType: string;
  mainRequirement: string;
  showSorazm: boolean;
  showVozm: boolean;
  showAdditionalRequirement: boolean;
  setShowAdditionalRequirement: (value: boolean) => void;
  handleMainRequirementChange: (value: string) => void;
}

export function RequirementsSection({
  claimType,
  mainRequirement,
  showSorazm,
  showVozm,
  showAdditionalRequirement,
  setShowAdditionalRequirement,
  handleMainRequirementChange,
}: RequirementsSectionProps) {
  const getAdditionalOptions = () => {
    if (!mainRequirement || !claimOptions[claimType as keyof typeof claimOptions])
      return [];
    return claimOptions[claimType as keyof typeof claimOptions].filter(
      (option) => option !== mainRequirement
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Требования</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Основное требование:</Label>
          <Select onValueChange={handleMainRequirementChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите требование" />
            </SelectTrigger>
            <SelectContent>
              {claimOptions[claimType as keyof typeof claimOptions]?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showSorazm && (
          <div>
            <Label htmlFor="sorazmAmount">
              Сумма соразмерного уменьшения стоимости товара (работ, услуг):
            </Label>
            <Input
              id="sorazmAmount"
              onBlur={formatNumberInput}
              placeholder="500,00"
            />
          </div>
        )}

        {showVozm && (
          <div>
            <Label htmlFor="vozmAmount">
              Сумма возмещения расходов по устранению недостатков:
            </Label>
            <Input
              id="vozmAmount"
              onBlur={formatNumberInput}
              placeholder="300,00"
            />
          </div>
        )}

        {(claimType === "nekachTov" || claimType === "nekachUsl") && mainRequirement && (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowAdditionalRequirement(!showAdditionalRequirement)}
            >
              {showAdditionalRequirement
                ? "Скрыть дополнительное требование"
                : "Добавить дополнительное требование"}
            </Button>

            {showAdditionalRequirement && (
              <div>
                <Label htmlFor="additionalRequirement">
                  Дополнительное требование:
                </Label>
                <Select>
                  <SelectTrigger id="additionalRequirement">
                    <SelectValue placeholder="Выберите дополнительное требование" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAdditionalOptions().map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}