"use client";

import { useEffect, useRef, useState } from 'react';

interface SmoothScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function SmoothScrollSection({ children, className = "" }: SmoothScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Предотвращаем конфликт между Lenis и Framer Motion
    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          // Добавляем класс для оптимизации когда секция в view
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          
          if (isVisible) {
            section.classList.add('scroll-optimized');
            setIsOptimized(true);
          } else {
            section.classList.remove('scroll-optimized');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Используем пассивный слушатель для лучшей производительности
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Проверяем начальное состояние
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${className} ${isOptimized ? 'scroll-optimized' : ''}`}
      style={{
        // Предотвращаем мерцание при скролле
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: isOptimized ? 'transform, opacity' : 'auto'
      }}
    >
      {children}
    </section>
  );
}