"use client";

import { useState, useEffect, useRef } from 'react';

interface OptimizedMapProps {
  src: string;
  title: string;
  className?: string;
}

export default function OptimizedMap({ src, title, className = "" }: OptimizedMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (isInView && !isLoaded && iframeRef.current) {
      // Загружаем iframe только когда он в зоне видимости
      iframeRef.current.src = src;
    }
  }, [isInView, isLoaded, src]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className={`relative map-container ${className}`}>
      {/* Заглушка пока карта не загружена */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center z-10">
          <div className="text-gray-400 dark:text-gray-500 text-sm animate-pulse">
            Încărcarea hărții...
          </div>
        </div>
      )}
      
      {/* Сам iframe загружается только когда нужно */}
      <iframe
        ref={iframeRef}
        title={title}
        width="100%"
        height="100%"
        style={{ 
          border: 0,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full map-iframe"
        onLoad={handleIframeLoad}
        // Важно: не загружаем src сразу, чтобы не блокировать скролл
        src={isInView ? src : undefined}
      />
    </div>
  );
}