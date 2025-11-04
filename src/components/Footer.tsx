'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { siViber, siTelegram } from 'simple-icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by only calculating isDark after component mounts
  const isDark = mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));

  const footerSections = [
    {
      title: 'Servicii',
      links: [
        { name: 'Evidență contabilă', href: '#servicii' },
        { name: 'Consultanță fiscală', href: '#servicii' },
        { name: 'Restabilirea evidenței contabile', href: '#servicii' },
        { name: 'Analiză și diagnostic financiar', href: '#servicii' },
        { name: 'Suport în inițierea afacerii', href: '#servicii' },
      ]
    },
    {
      title: 'Companie',
      links: [
        { name: 'Despre noi', href: '#despre' },
        { name: 'Echipa', href: '#echipa' },
        { name: 'Cariere', href: '#cariere' },
      ]
    },
    {
      title: 'Suport',
      links: [
        { name: 'Întrebări frecvente', href: '#faq' },
        { name: 'Calculator costuri', href: '#calculator' },
        { name: 'Contact', href: '#contact' },
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
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
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
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              © {currentYear} EgoTax. Toate drepturile rezervate.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200",
                    social.color
                  )}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.a>
              ))}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 text-sm"
            >
              <a
                href="#privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Politica de confidențialitate
              </a>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <a
                href="#terms"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Termeni și condiții
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;