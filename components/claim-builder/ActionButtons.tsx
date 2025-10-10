"use client";

import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  isAgreed: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
}

export function ActionButtons({ isAgreed, handleSubmit, handleReset }: ActionButtonsProps) {
  return (
    <>
      <Button
        disabled={!isAgreed}
        className={`w-full ${!isAgreed && `opacity-75`}`}
        size="lg"
        onClick={handleSubmit}
      >
        Сформировать претензию
      </Button>
      <Button variant="outline" className="w-full" onClick={handleReset}>
        Очистить форму
      </Button>
    </>
  );
}