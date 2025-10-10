"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AgreementSectionProps {
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
}

export function AgreementSection({ isAgreed, setIsAgreed }: AgreementSectionProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="agreement"
        checked={isAgreed}
        onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
      />
      <Label htmlFor="agreement">
        Я ознакомлен и согласен с{" "}
        <Link
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          политикой обработки моих персональных данных
        </Link>
      </Label>
    </div>
  );
}