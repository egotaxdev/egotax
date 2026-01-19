"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OCRequestForm from "@/components/OCRequestForm";

const faqData = [
  {
    id: "item-1",
    question: "Cine este obligat să țină evidența contabilă în Republica Moldova?",
    answer: "Conform legii contabilității și raportării financiare, persoanele juridice și persoanele fizice care practică activitate de întreprinzător, sunt obligate să asigure ținerea evidenței contabile în conformitate cu legislația în vigoare."
  },
  {
    id: "item-2",
    question: "Ce regimuri fiscale există în Republica Moldova?",
    answer: "În Republica Moldova, există următoarele regimuri de impozitare: regimul general de impozitare (12% din profit), regimul special pentru întreprinderile mici și mijlocii (4% din venituri), regimul special pentru rezidenții IT Park."
  },
  {
    id: "item-3",
    question: "Când apare obligația de înregistrare ca plătitor de TVA?",
    answer: "Subiectul care desfășoară activitate de întreprinzător, cu excepția antreprenorilor independenți conform cap. 104 al titlului II CF, autorităților publice, instituțiilor publice, este obligat să se înregistreze ca contribuabil al T.V.A. dacă el, într-o oricare perioadă de 12 luni consecutive, a efectuat livrări de mărfuri, servicii în sumă ce depășește 1,2 milioane de lei, cu excepția livrărilor scutite de T.V.A. fără drept de deducere și a celor care nu constituie obiect impozabil în conformitate cu art.95 alin.(2) din Codul Fiscal al RM."
  },
  {
    id: "item-4",
    question: "Ce obligații fiscale are angajatorul în cazul raporturilor de muncă?",
    answer: "Angajatorul este obligat să calculeze, să rețină și să achite: impozitul pe venit din salariu – 12%; contribuțiile de asigurări sociale – 24%; primele de asigurare medicală – 9%; precum și să prezinte rapoartele fiscale și statistice aferente conform termenului de prezentare stabilit de cadrul normativ în vigoare."
  },
  {
    id: "item-5",
    question: "Ce consecințe pot apărea în cazul nedepunerii declarațiilor fiscale la timp?",
    answer: "Nedepunerea sau depunerea cu întârziere a declarațiilor fiscale atrage sancțiuni sub formă de amenzi și penalități de întârziere, conform Codului fiscal al Republicii Moldova."
  },
  {
    id: "item-6",
    question: "Este obligatorie angajarea unui contabil dacă compania abia a început activitatea?",
    answer: "Conform legii contabilității și raportării financiare, conducerea entității este obligată să asigure ținerea contabilității și raportării financiare, și în acest sens are dreptul să desemneze un contabil-șef sau o altă persoană împuternicită de organizarea și conducerea contabilității. Ca alternativă, entitatea poate să transmită ținerea contabilității altei entități în bază contractuală. Contabilul-șef trebuie să dețină diplomă de studii superioare în domeniul economiei. Reiterăm importanța angajării unui contabil profesionist încă din primul an de activitate."
  }
];

export default function FAQSection() {
  const [isMobile, setIsMobile] = useState(true);
  const [isOCFormOpen, setIsOCFormOpen] = useState(false);

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: isMobile ? {} : {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="py-12 lg:py-24 bg-white dark:bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-6">
              Întrebări frecvente
              <span className="text-[#FFB343] block">despre contabilitate și fiscalitate</span>
            </h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Răspunsuri la cele mai populare întrebări despre impozite, documente și declarații fiscale
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div variants={itemVariants}>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3 lg:space-y-4"
              defaultValue="item-1"
            >
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900/50 rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden active:scale-[0.99] lg:hover:shadow-md dark:lg:hover:shadow-gray-900/20 transition-all duration-300"
                >
                  <AccordionItem value={faq.id} className="border-none">
                    <AccordionTrigger className="px-4 py-4 lg:px-8 lg:py-6 text-left hover:no-underline lg:hover:bg-gray-50 lg:dark:hover:bg-gray-700 transition-colors duration-200">
                      <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white pr-2 lg:pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 lg:px-8 lg:pb-6">
                      <div className="text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-8 lg:mt-16">
            <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-4 lg:mb-6">
              Nu ai găsit răspunsul la întrebarea ta?
            </p>
            <button
              onClick={() => setIsOCFormOpen(true)}
              className="w-full sm:w-auto bg-[#FFB343] hover:bg-[#FFC56D] text-black font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
            >
              Obține o consultație gratuită
            </button>
          </motion.div>
        </motion.div>

        {/* OC Request Form */}
        <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
      </div>
    </section>
  );
}