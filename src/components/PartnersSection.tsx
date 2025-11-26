'use client';

import React, { useState, useEffect } from 'react';
import { Marquee } from '@/components/ui/marquee';
import { SplittingText } from '@/components/ui/shadcn-io/splitting-text';
import Image from 'next/image';

const partners = [
  { name: 'AD Cleaning', logo: '/partners/Adcleaning.jpg' },
  { name: 'Amoramar', logo: '/partners/amoramar.png' },
  { name: 'CIC', logo: '/partners/cic.jpg' },
  { name: 'DSG', logo: '/partners/dsg.png' },
  { name: 'Fatade 3D', logo: '/partners/fatade3d.png' },
  { name: 'Garretts', logo: '/partners/garretts.jpg' },
  { name: 'Kontrast', logo: '/partners/kontrast.png' },
  { name: 'Paradigm', logo: '/partners/paradigm.png' },
  { name: 'Red', logo: '/partners/red.png' },
  { name: 'Shvets', logo: '/partners/shvets.jpg' },
  { name: 'Standup', logo: '/partners/standup.png' },
  { name: 'Surcons', logo: '/partners/surcons.jpg' },
  { name: 'TYYS', logo: '/partners/tyys.jpg' },
  { name: 'Uniqa', logo: '/partners/uniqa.jpg' },
  { name: 'Yard', logo: '/partners/yard.png' },
];

const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
const secondRow = partners.slice(Math.ceil(partners.length / 2));

const PartnerCard = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <div className="relative mx-4 flex h-24 w-40 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
      <div className="relative w-full h-full">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default function PartnersSection() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Заголовок секции */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white uppercase">
          {isMobile ? (
            "Parteneri"
          ) : (
            <SplittingText
              text="Parteneri"
              type="chars"
              inView={true}
              motionVariants={{
                initial: { x: 150, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.7, ease: 'easeOut' },
                stagger: 0.05,
              }}
              delay={300}
            />
          )}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Companii care au încredere în serviciile noastre
        </p>
      </div>

      {/* Marquee с логотипами */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((partner) => (
            <PartnerCard key={partner.name} {...partner} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((partner) => (
            <PartnerCard key={partner.name} {...partner} />
          ))}
        </Marquee>

        {/* Градиенты по краям */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-[#1e1e1e]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-[#1e1e1e]"></div>
      </div>
    </section>
  );
}
