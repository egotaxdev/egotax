"use client";

import ScrollReveal from "./ScrollReveal";

export default function ServiceSection() {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="w-full max-w-[1280px] mx-auto px-4">
        <ScrollReveal 
          containerClassName="text-center"
          textClassName="text-gray-900 dark:text-white text-[clamp(2rem,5vw,4rem)]"
        >
          Nu trebuie să alergați cu actele primare pentru Fisc și să vă gândiți ce și când trebuie depus.
          Vom colecta, vom depune și vom închide toată raportarea în locul dumneavoastră.
        </ScrollReveal>
      </div>
    </section>
  );
}