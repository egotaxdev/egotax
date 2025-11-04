"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function DarkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="bg-white dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl p-8 md:p-12"
        >
          <div className="flex flex-col lg:flex-row h-full gap-8 lg:gap-12 items-center">
            {/* Левый блок */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-[30%] flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h3 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold mb-3">Gumenco Eugenia</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xl mb-8">fondator & administrator</p>
              <button className="group relative overflow-hidden bg-gradient-to-r from-[#ffe502] via-[#ffed33] to-[#ffe502] hover:from-[#ffed33] hover:via-[#ffe502] hover:to-[#ffed33] text-black font-bold px-8 py-4 rounded-2xl transition-all duration-500 ease-out uppercase text-sm shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 border border-gray-200 hover:border-gray-300 backdrop-blur-sm cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 whitespace-nowrap">
                  Luați legătura cu Eugenia
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
            </motion.div>

            {/* Центральный блок */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-[40%] relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <motion.img 
                src="/eugenia.jpg" 
                alt="Eugenia" 
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </motion.div>

            {/* Правый блок */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-[30%] flex items-center justify-center lg:justify-start text-center lg:text-left"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl leading-relaxed">
                Personal răspund pentru calitatea serviciilor contabile.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}