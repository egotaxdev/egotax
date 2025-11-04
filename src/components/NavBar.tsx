'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Sun, Moon, Menu } from 'lucide-react';
import { siViber, siTelegram } from 'simple-icons';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent hydration mismatch by only calculating isDark after component mounts
  const isDark = mounted && (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));

  const menuItems = [
    { name: 'Acasă', href: '#' },
    { name: 'Servicii', href: '#' },
    { name: 'Despre noi', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0
      }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'w-[95%] max-w-7xl' : 'w-[90%] max-w-6xl'
      }`}
    >
      <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src={mounted && isDark ? "/white.svg" : "/black.svg"}
                alt="EgoTax Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 font-medium text-foreground transition-all duration-300 ease-in-out cursor-pointer",
                    "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-primary",
                    "after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2",
                    "hover:after:w-full"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Phone Number */}
              <div className="hidden md:flex items-center">
                <a
                  href="tel:+37361142323"
                  className={cn(
                    "flex items-center space-x-2 bg-[#FFE500] text-black px-4 py-2 rounded-full font-medium shadow-sm",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-[#FFD700] hover:shadow-md hover:scale-105",
                    "active:scale-95 active:shadow-sm",
                    "cursor-pointer"
                  )}
                >
                  <Phone className="w-4 h-4" />
                  <span>+(373) 61 142 323</span>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center space-x-2">
                {/* Viber */}
                <a
                  href="#"
                  className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={siViber.path} />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="#"
                  className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={siTelegram.path} />
                  </svg>
                </a>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                aria-label="Toggle theme"
              >
                {mounted && isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}