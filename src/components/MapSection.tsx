"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import OptimizedMap from "./OptimizedMap";
import SmoothScrollSection from "./SmoothScrollSection";

const MapSection = () => {
  const address = "str. Alexandru cel Bun, 91, et. 2, mun. Chișinău, Republica Moldova";
  const encodedAddress = encodeURIComponent(address);
  
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+373 22 123 456"
    },
    {
      icon: Clock,
      title: "Program de lucru",
      content: "Luni - Vineri: 09:00 - 18:00"
    },
    {
      icon: Mail,
      title: "Email",
      content: "office@egotax.md"
    }
  ];

  return (
    <SmoothScrollSection className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Vizitați-ne
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Biroul nostru este situat în centrul Chișinăului pentru accesibilitate maximă
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="bg-white dark:bg-gray-900/50 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="aspect-[16/9] lg:aspect-[21/9] w-full">
              <OptimizedMap
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2719.5929729362874!2d28.835109!3d47.028594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97d41f67f6661%3A0x4f73182e60ab0800!2sEGO%20TAX%20CONSULTING!5e0!3m2!1sru!2sus!4v1761986827535!5m2!1sru!2sus"
                title="Locația biroului EgoTax"
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Overlay with address info */}
          <motion.div
            className="absolute top-6 left-6 bg-white/95 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 max-w-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Biroul EgoTax
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