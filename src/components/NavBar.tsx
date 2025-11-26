'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { siViber, siTelegram } from 'simple-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { services } from '@/data/services';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
              <a href="/" className="block">
                <Image
                  src={mounted && isDark ? "/white.svg" : "/black.svg"}
                  alt="EgoTax Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto cursor-pointer"
                />
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="space-x-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-transparent font-medium text-foreground transition-all duration-300 ease-in-out cursor-pointer",
                        "relative after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-primary",
                        "after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2",
                        "hover:after:w-3/4"
                      )}
                    >
                      Acasă
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn(
                      "bg-transparent hover:bg-transparent font-medium text-foreground transition-all duration-300 ease-in-out cursor-pointer",
                      "relative after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-primary",
                      "after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2",
                      "hover:after:w-3/4"
                    )}>
                      Servicii
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] gap-3 p-4 lg:w-[600px]">
                        {services.map((service) => {
                          const IconComponent = service.icon;
                          return (
                            <li key={service.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={service.href}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                    "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center flex-shrink-0">
                                      <IconComponent className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-medium leading-none mb-1">{service.title}</div>
                                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                        {service.description}
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/despre-noi"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-transparent font-medium text-foreground transition-all duration-300 ease-in-out cursor-pointer",
                        "relative after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-primary",
                        "after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2",
                        "hover:after:w-3/4"
                      )}
                    >
                      Despre noi
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/contact"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-transparent font-medium text-foreground transition-all duration-300 ease-in-out cursor-pointer",
                        "relative after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-primary",
                        "after:transition-all after:duration-300 after:ease-out after:-translate-x-1/2",
                        "hover:after:w-3/4"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <a
                      href="/calculator"
                      className="inline-flex flex-row items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Calculator</span>
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Phone Number */}
              <div className="hidden md:flex items-center">
                <a
                  href="tel:+37361142323"
                  className={cn(
                    "flex items-center space-x-2 bg-[#FFB343] text-black px-4 py-2 rounded-full font-medium shadow-sm",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-[#FFC56D] hover:shadow-md hover:scale-105",
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
              <Sheet open={isMenuOpen} onOpenChange={(open) => {
                setIsMenuOpen(open);
                if (!open) setIsServicesOpen(false);
              }}>
                <SheetTrigger asChild>
                  <button className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[90%] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-0 flex flex-col">
                  {/* Header */}
                  <SheetHeader className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <Image
                      src={mounted && isDark ? "/white.svg" : "/black.svg"}
                      alt="EgoTax Logo"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                    <SheetTitle className="sr-only">Meniu de navigare</SheetTitle>
                  </SheetHeader>

                  {/* Navigation */}
                  <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <div className="space-y-1">
                      {/* Acasă */}
                      <a
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <span className="text-base font-medium">Acasă</span>
                      </a>

                      {/* Servicii - Collapsible */}
                      <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                        <CollapsibleTrigger className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all active:scale-[0.98]">
                          <div className="w-10 h-10 rounded-full bg-[#FFB343] flex items-center justify-center">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <span className="text-base font-medium flex-1 text-left">Servicii</span>
                          <ChevronDown className={cn(
                            "w-5 h-5 text-gray-400 transition-transform duration-300",
                            isServicesOpen && "rotate-180"
                          )} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                          <div className="ml-14 mt-2 space-y-1 pb-2">
                            {services.map((service, index) => {
                              const IconComponent = service.icon;
                              return (
                                <motion.a
                                  key={service.title}
                                  href={service.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all active:scale-[0.98] group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-[#FFB343] flex items-center justify-center transition-colors">
                                    <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-black transition-colors" />
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {service.title}
                                  </span>
                                </motion.a>
                              );
                            })}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Despre noi */}
                      <a
                        href="/despre-noi"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="text-base font-medium">Despre noi</span>
                      </a>

                      {/* Contact */}
                      <a
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-base font-medium">Contact</span>
                      </a>

                      {/* Calculator */}
                      <a
                        href="/calculator"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all active:scale-[0.98]"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-base font-medium">Calculator</span>
                      </a>
                    </div>
                  </nav>

                  {/* Bottom Section */}
                  <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    {/* Phone CTA */}
                    <a
                      href="tel:+37361142323"
                      className="flex items-center justify-center gap-3 w-full bg-[#FFB343] hover:bg-[#FFC56D] text-black px-6 py-4 rounded-2xl font-semibold shadow-lg shadow-[#FFB343]/20 transition-all active:scale-[0.98] mb-4"
                    >
                      <Phone className="w-5 h-5" />
                      <span>+(373) 61 142 323</span>
                    </a>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={siViber.path} />
                        </svg>
                        <span className="text-sm font-medium">Viber</span>
                      </a>
                      <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={siTelegram.path} />
                        </svg>
                        <span className="text-sm font-medium">Telegram</span>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}