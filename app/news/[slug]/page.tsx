"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

// This would typically come from a database or CMS
const articles = {
  "supreme-court-ruling": {
    title: "Supreme Court Ruling Analysis",
    date: "2024-01-15",
    content: "Detailed analysis of the recent Supreme Court ruling and its implications...",
  },
  "new-warranty-rules": {
    title: "Новые правила гарантийного обслуживания автомобилей",
    date: "10 июня 2025",
    content: "Что изменилось в законодательстве о защите прав потребителей при гарантийном обслуживании автомобилей..."
  },
  "refund-for-poor-repair": {
    title: "Как вернуть деньги за некачественный ремонт",
    date: "5 июня 2025",
    content: "Пошаговая инструкция по возврату средств за некачественно выполненный ремонт автомобиля..."
  },
  "successful-case-against-dealer": {
    title: "Успешное дело против крупного автосалона",
    date: "1 июня 2025",
    content: "История успеха: как наш клиент добился справедливости в споре с известным автосалоном..."
  },
  "insurance-claims-tips": {
    title: "Особенности предъявления претензий к страховым компаниям",
    date: "25 мая 2025",
    content: "Что нужно знать при взаимодействии со страховыми компаниями и как правильно оформить претензию..."
  },
  "consumer-protection-law-changes": {
    title: "Обзор изменений в законе о защите прав потребителей",
    date: "20 мая 2025",
    content: "Анализ последних изменений в законодательстве и их влияние на права потребителей автомобильных услуг..."
  }
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug: slug,
  }));
}

export default function NewsArticle({
  params,
}: {
  params: { slug: string };
}) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{article.date}</p>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>{article.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}