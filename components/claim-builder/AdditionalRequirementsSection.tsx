"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatNumberInput } from "@/lib/eventHandlers";

interface AdditionalRequirementsSectionProps {
  claimType: string;
  showMoralDamage: boolean;
  showPenalty: boolean;
  setShowMoralDamage: (value: boolean) => void;
  setShowPenalty: (value: boolean) => void;
}

export function AdditionalRequirementsSection({
  claimType,
  showMoralDamage,
  showPenalty,
  setShowMoralDamage,
  setShowPenalty,
}: AdditionalRequirementsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Дополнительные требования</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {claimType !== "otkaz" && claimType !== "vozvrat" && (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                id="moralDamage"
                onCheckedChange={setShowMoralDamage}
              />
              <Label htmlFor="moralDamage">Моральный вред</Label>
            </div>
            {showMoralDamage && (
              <div>
                <Label htmlFor="moralAmount">Сумма морального вреда</Label>
                <Input
                  id="moralAmount"
                  onBlur={formatNumberInput}
                  placeholder="1000,00"
                />
              </div>
            )}
          </>
        )}

        {(claimType === "srokiTov" || claimType === "srokiUsl") && (
          <div className="flex items-center space-x-2">
            <Switch id="penalty" onCheckedChange={setShowPenalty} />
            <Label htmlFor="penalty">Неустойка за нарушение сроков</Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}