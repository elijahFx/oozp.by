"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface AnalyticsTrackerProps {
  yandexCounterId?: number;
}

export function AnalyticsTracker({ yandexCounterId = 104384730 }: AnalyticsTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ym && window.gtag) {
      const url = window.location.href;
      window.ym(yandexCounterId, 'hit', url);
      window.gtag('config', 'G-0KC6R19FS3', {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams, yandexCounterId]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element).closest('[data-track-event]');
      
      if (target && typeof window !== 'undefined') {
        const eventName = target.getAttribute('data-track-event');
        
        if (eventName) {
          if (window.ym) {
            window.ym(yandexCounterId, 'reachGoal', eventName);
          }
          if (window.gtag) {
            window.gtag('event', eventName);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [yandexCounterId]);

  return null;
}