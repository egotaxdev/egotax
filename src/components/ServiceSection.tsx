"use client";

import ScrollReveal from "./ScrollReveal";
import "./ServiceSection.css";

export default function ServiceSection() {
  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-[#1e1e1e]">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <div className="space-y-8 lg:space-y-12">
          <div className="highlight-viziunea">
            <ScrollReveal
              containerClassName="text-center"
              textClassName="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl lg:text-[clamp(1.5rem,4vw,2.5rem)] leading-relaxed"
            >
              Viziunea noastră este de a fi partenerul de încredere în afaceri, astfel încât dvs să vă atingenți obiectivele financiare cu încredere, fiind ghidați de expertiza noastră.
            </ScrollReveal>
          </div>

          <div className="highlight-misiunea">
            <ScrollReveal
              containerClassName="text-center"
              textClassName="text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl lg:text-[clamp(1.5rem,4vw,2.5rem)] leading-relaxed"
            >
              Misiunea noastră constă în furnizarea serviciilor calitative de evidență contabilă, precum și alte soluții financiare complete și personalizate, în timp util și la momentul oportun, care vă vor ajuta să luați decizii financiare informate.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}