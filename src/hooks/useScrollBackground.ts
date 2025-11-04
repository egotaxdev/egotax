"use client";

import { useState, useEffect } from 'react';

interface SectionConfig {
  id: string;
  background: 'light' | 'dark';
  offset?: number;
}

const defaultSections: SectionConfig[] = [
  { id: 'hero', background: 'dark' },
  { id: 'stats', background: 'light' },
  { id: 'bento', background: 'dark' },
  { id: 'dark-section', background: 'dark' },
  { id: 'services', background: 'light' },
  { id: 'work-process', background: 'dark' },
  { id: 'business-types', background: 'light' },
  { id: 'faq', background: 'dark' },
  { id: 'map', background: 'light' },
  { id: 'calculator', background: 'dark' },
];

export function useScrollBackground(sections: SectionConfig[] = defaultSections) {
  const [currentBackground, setCurrentBackground] = useState<'light' | 'dark'>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section should be active based on scroll position
      let activeSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollY + rect.top;
          const elementHeight = rect.height;
          
          // Check if we're in the middle third of the section
          if (scrollY >= elementTop - windowHeight * 0.4 && 
              scrollY < elementTop + elementHeight - windowHeight * 0.4) {
            activeSection = section;
            break;
          }
        }
      }
      
      // Only change background if it's different
      if (activeSection.background !== currentBackground) {
        setIsTransitioning(true);
        setCurrentBackground(activeSection.background);
        
        // Reset transition state after animation
        setTimeout(() => setIsTransitioning(false), 800);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [currentBackground, sections]);

  return {
    currentBackground,
    isTransitioning,
    isDark: currentBackground === 'dark',
    isLight: currentBackground === 'light'
  };
}
