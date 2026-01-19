"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import OptimizedMap from "./OptimizedMap";
import SmoothScrollSection from "./SmoothScrollSection";

const MapSection = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const address = "str. Alexandru cel Bun, 91, et. 2, mun. Chișinău, Republica Moldova";
  const encodedAddress = encodeURIComponent(address);
  
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+373 61 142 323"
    },
    {
      icon: Clock,
      title: "Program de lucru",
      content: "Luni - Vineri: 09:00 - 18:00"
    },
    {
      icon: Mail,
      title: "Email",
      content: "egotaxcont@gmail.com"
    }
  ];

  return (
    <SmoothScrollSection className="py-12 lg:py-20 bg-white dark:bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-6 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-3 lg:mb-6">
            Contacte
          </h2>
          <p className="text-base lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Te așteptăm la biroul nostru, situat în centrul Chișinăului
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll cards */}
        <div className="lg:hidden mb-6 -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[200px] snap-start bg-white dark:bg-gray-900/50 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={isMobile ? {} : { duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-800 dark:text-white">
                      {info.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {info.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FFB343] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {info.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Mobile: Address card above map */}
          <div className="lg:hidden mb-4">
            <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-1">
                    Biroul Ego Tax
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900/50 rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
              <OptimizedMap
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2719.5929729362874!2d28.835109!3d47.028594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d41f67f6661%3A0x4f73182e60ab0800!2sEGO%20TAX%20CONSULTING!5e0!3m2!1sru!2sus!4v1761986827535!5m2!1sru!2sus"
                title="Locația biroului EgoTax"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Desktop: Overlay with address info */}
          <motion.div
            className="hidden lg:block absolute top-6 left-6 bg-white/95 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 max-w-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-[#FFB343] rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Biroul Ego Tax
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {address}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SmoothScrollSection>
  );
};

export default MapSection;