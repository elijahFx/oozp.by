'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const heroImages = [
  {
    src: "/imgs/minsk.webp",
    alt: "Минск - защита прав потребителей"
  },
  {
    src: "/imgs/minsk2.webp", 
    alt: "Минск - защита прав потребителей"
  },
  {
    src: "/imgs/minsk3.webp",
    alt: "Минск - защита прав потребителей"
  },
  {
    src: "/imgs/minsk4.webp",
    alt: "Минск - защита прав потребителей"
  },
  {
    src: "/imgs/minsk5.webp",
    alt: "Минск - защита прав потребителей"
  }
];

export default function HeroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Меняем изображение каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-110'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
              sizes="100vw"
              quality={85}
            />
          </div>
        ))}
        
        {/* Image indicators */}
        <div className="absolute bottom-8 right-8 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}