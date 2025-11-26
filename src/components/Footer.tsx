'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { siViber, siTelegram } from 'simple-icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(s => s !== title)
        : [...prev, title]
    );
  };

  // Prevent hydration mismatch by only calculating isDark after component mounts
  const isDark = mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));

  const footerSections = [
    {
      title: 'Servicii',
      links: [
        { name: 'Evidență contabilă', href: '/servicii/servicii-contabile' },
        { name: 'Consultanță fiscală', href: '/servicii/consultanta-fiscala' },
        { name: 'Restabilirea evidenței contabile', href: '/servicii/restabilirea-evidentei' },
        { name: 'Analiză și diagnostic financiar', href: '/servicii/analiza-financiara' },
        { name: 'Suport în inițierea afacerii', href: '/servicii/suport-initiere-afacere' },
      ]
    },
    {
      title: 'Companie',
      links: [
        { name: 'Despre noi', href: '/despre-noi' },
        { name: 'Cariere', href: '#cariere' },
      ]
    },
    {
      title: 'Suport',
      links: [
        { name: 'Întrebări frecvente', href: '/faq' },
        { name: 'Calculator costuri', href: '/calculator' },
        { name: 'Contact', href: '/contact' },
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: '+373 60 123 456',
      href: 'tel:+37360123456'
    },
    {
      icon: Mail,
      text: 'contact@egotax.md',
      href: 'mailto:contact@egotax.md'
    },
    {
      icon: MapPin,
      text: 'Chișinău, str. Ștefan cel Mare 123',
      href: '#'
    },
    {
      icon: Clock,
      text: 'Luni - Vineri: 09:00 - 18:00',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Telegram',
      icon: null,
      href: '#',
      color: 'hover:text-blue-500',
      customIcon: siTelegram
    },
    {
      name: 'Viber',
      icon: null,
      href: '#',
      color: 'hover:text-purple-600',
      customIcon: siViber
    }
  ];

  return (
    <footer className="bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src={mounted && isDark ? "/white.svg" : "/black.svg"}
                alt="EgoTax Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Servicii profesionale de contabilitate și consultanță fiscală în Moldova.
              Expertiză de încredere pentru afacerea ta.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links - Mobile Only (shown here) */}
            <div className="flex items-center space-x-3 pt-2 md:hidden">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200",
                    social.color
                  )}
                  title={social.name}
                >
                  {social.icon ? (
                    <social.icon className="w-4 h-4" />
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={social.customIcon?.path} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections - Collapsible on Mobile */}
          {footerSections.map((section) => (
            <div key={section.title}>
              {isMobile ? (
                <Collapsible
                  open={openSections.includes(section.title)}
                  onOpenChange={() => toggleSection(section.title)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-500 transition-transform duration-200",
                        openSections.includes(section.title) && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3 pb-2">
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors hover:translate-x-0.5 inline-block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400 order-3 md:order-1">
              © {currentYear} EgoTax. Toate drepturile rezervate.
            </div>

            {/* Social Links - Desktop Only */}
            <div className="hidden md:flex items-center space-x-4 order-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200 hover:scale-110",
                    social.color
                  )}
                  title={social.name}
                >
                  {social.icon ? (
                    <social.icon className="w-4 h-4" />
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={social.customIcon?.path} />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm order-1 md:order-3">
              <a
                href="#privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Politica de confidențialitate
              </a>
              <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
              <a
                href="#terms"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Termeni și condiții
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;