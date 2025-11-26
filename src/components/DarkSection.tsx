"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import OCRequestForm from "@/components/OCRequestForm";

export default function DarkSection() {
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: isMobile ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: isMobile ? {} : {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile ? {} : {
        duration: 0.6
      }
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 bg-white dark:bg-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-white dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl p-8 md:p-12"
        >
          <div className="flex flex-col lg:flex-row h-full gap-8 lg:gap-12 items-center">
            {/* Левый блок - Заголовок и кнопка */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-[30%] flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h3 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-8">
                Luați legătura cu noi
              </h3>
              <button
                onClick={() => setIsOCFormOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#FFB343] hover:bg-[#FFC56D] text-black font-bold uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#FFB343]/20 cursor-pointer"
              >
                Contactați-ne
              </button>
            </motion.div>

            {/* Центральный блок - Фото команды */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-[40%] relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <motion.img
                src="/team.jpg"
                alt="Echipa Egotax"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </motion.div>

            {/* Правый блок - Текст о команде */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-[30%] flex items-center justify-center lg:justify-start text-center lg:text-left"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl leading-relaxed">
                Echipa noastră de profesioniști se dedică construirii unor relații de lungă durată cu clienții,
                bazate pe încredere, integritate și excelență.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* OC Request Form */}
      <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
    </section>
  );
}