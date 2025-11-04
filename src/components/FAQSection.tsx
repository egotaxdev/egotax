"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function FAQSection() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Întrebări frecvente
              <span className="text-[#ffe502] block">despre fiscalitate</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Răspunsuri la cele mai populare întrebări despre impozite, documente și termene de depunere a declarațiilor
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div variants={itemVariants}>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-4"
              defaultValue="item-1"
            >
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow duration-300"
                >
                  <AccordionItem value={faq.id} className="border-none">
                    <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Nu ați găsit răspunsul la întrebarea dumneavoastră?
            </p>
            <button className="bg-[#ffe502] hover:bg-[#ffed33] text-black font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
              Obțineți consultație gratuită
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}