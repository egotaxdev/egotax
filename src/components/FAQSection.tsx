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
    question: "Ce documente sunt necesare pentru depunerea declarației fiscale?",
    answer: "Pentru depunerea declarației sunt necesare: adeverința de venituri, documentele de cheltuieli (chitanțe, contracte), adeverințele de conturi bancare, documentele de proprietate imobiliară și alte bunuri. Lista completă depinde de situația dumneavoastră - vă ajutăm să determinăm documentele necesare individual."
  },
  {
    id: "item-2", 
    question: "Până când trebuie depusă declarația?",
    answer: "Declarația pentru anul 2025 trebuie depusă până la 31 martie 2026. Dacă ați obținut venituri de la care nu s-a reținut impozitul sau doriți să obțineți deduceri fiscale - nu întârziați cu depunerea. Vă ajutăm să pregătiți toate documentele la timp."
  },
  {
    id: "item-3",
    question: "Pot obține deduceri fiscale pentru anii trecuți?",
    answer: "Da, puteți depune declarații și obține deduceri pentru ultimii 3 ani. De exemplu, în 2026 puteți obține deduceri pentru 2023, 2024 și 2025. Aceasta se referă la deducerile imobiliare, sociale și de investiții."
  },
  {
    id: "item-4",
    question: "Ce se întâmplă dacă nu depun declarația la timp?",
    answer: "Pentru depunerea întârziată a declarației este prevăzută o amendă de la 1000 lei. Dacă există impozit de plătit, se calculează în plus penalități pentru fiecare zi de întârziere. Mai bine să nu riscați - contactați-ne și vă ajutăm să aranjați totul corect și la timp."
  },
  {
    id: "item-5",
    question: "Cât costă serviciile dumneavoastră de contabilitate fiscală?",
    answer: "Costul depinde de complexitatea situației dumneavoastră și volumul de muncă. Consultația este gratuită, pregătirea unei declarații simple - de la 200 lei, ținerea completă a evidenței pentru PFA - de la 500 lei pe lună. Costul exact îl calculăm după analiza documentelor dumneavoastră."
  },
  {
    id: "item-6",
    question: "Cât de repede pot obține deducerea fiscală?",
    answer: "Procedura standard durează până la 4 luni: 3 luni pentru verificarea camerală și 1 lună pentru returnarea banilor. Vă ajutăm să pregătiți toate documentele corect din prima încercare, pentru a evita solicitări suplimentare și a accelera procesul."
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
              <span className="text-[#FFB343] block">despre fiscalitate</span>
            </h2>
            <p className="text-base lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Răspunsuri la cele mai populare întrebări despre impozite, documente și termene de depunere a declarațiilor
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
              Nu ați găsit răspunsul la întrebarea dumneavoastră?
            </p>
            <button
              onClick={() => setIsOCFormOpen(true)}
              className="w-full sm:w-auto bg-[#FFB343] hover:bg-[#FFC56D] text-black font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
            >
              Obțineți consultație gratuită
            </button>
          </motion.div>
        </motion.div>

        {/* OC Request Form */}
        <OCRequestForm open={isOCFormOpen} onOpenChange={setIsOCFormOpen} />
      </div>
    </section>
  );
}