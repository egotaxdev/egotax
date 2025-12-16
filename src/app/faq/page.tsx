import { Metadata } from "next";
import FAQContent from "@/components/pages/FAQContent";
import { faqCategories } from "@/data/faq-data";

export const metadata: Metadata = {
  title: "Întrebări Frecvente (FAQ)",
  description:
    "Răspunsuri la cele mai frecvente întrebări despre serviciile de contabilitate, consultanță fiscală, costuri, termene și proceduri de lucru cu EgoTax Moldova.",
  keywords: [
    "întrebări frecvente contabilitate",
    "FAQ servicii contabile",
    "costuri contabilitate Moldova",
    "termene declarații fiscale",
    "consultanță fiscală întrebări",
  ],
  openGraph: {
    title: "Întrebări Frecvente | EgoTax",
    description:
      "Găsiți răspunsuri la întrebările despre contabilitate, fiscalitate și serviciile EgoTax Moldova.",
    url: "https://egotax.md/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/faq",
  },
};

function generateFAQJsonLd() {
  const allQuestions = faqCategories.flatMap((category) =>
    category.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions,
  };
}

export default function FAQPage() {
  const jsonLd = generateFAQJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQContent />
    </>
  );
}
