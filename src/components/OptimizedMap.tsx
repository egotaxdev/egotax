"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface OptimizedMapProps {
  src: string;
  title: string;
  className?: string;
}

export default function OptimizedMap({ src, title, className = "" }: OptimizedMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isActive, setIsActive] = useState(false);
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
      iframeRef.current.src = src;
    }
  }, [isInView, isLoaded, src]);

  // Деактивируем карту при скролле страницы
  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => setIsActive(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive]);

  // Деактивируем карту при клике вне контейнера
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isActive, handleClickOutside]);

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

      {/* Оверлей блокирует скролл карты, пока не кликнут */}
      {!isActive && isLoaded && (
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={() => setIsActive(true)}
        />
      )}

      <iframe
        ref={iframeRef}
        title={title}
        width="100%"
        height="100%"
        style={{
          border: 0,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full map-iframe"
        onLoad={handleIframeLoad}
        src={isInView ? src : undefined}
      />
    </div>
  );
}