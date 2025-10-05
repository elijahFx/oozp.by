"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  filename: string;
  slug: string;
  children: React.ReactNode;
}

export function DownloadButton({ filename, slug, children }: DownloadButtonProps) {
  const handleDownload = () => {
    // Создаем ссылку на файл в папке public
    const fileUrl = `/docs/${filename}`;

    // Отслеживаем скачивание
    if (typeof window !== 'undefined') {
      if ((window as any).ym) {
        (window as any).ym(104384730, 'reachGoal', `claim_download_${slug}`);
      }
      if ((window as any).gtag) {
        (window as any).gtag('event', `claim_download_${slug}`);
      }
    }

    // Создаем временную ссылку для скачивания
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant="outline" 
      className="w-full"
      onClick={handleDownload}
      data-track-event={`claim_samples_download_${slug}`}
    >
      <Download className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}