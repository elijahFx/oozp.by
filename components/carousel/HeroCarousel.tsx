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
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        
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
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
        ))}
        
        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}