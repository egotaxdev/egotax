import { HelpCircle, FileText, Calculator, Clock, Shield, Users, LucideIcon } from 'lucide-react';

export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'Întrebări generale',
    icon: HelpCircle,
    questions: [
      {
        id: 'general-1',
        question: 'Ce servicii oferă EgoTax?',
        answer: 'EgoTax oferă o gamă completă de servicii contabile și fiscale: evidență contabilă, consultanță fiscală, restabilirea evidenței contabile, analiză și diagnostic financiar, precum și suport în inițierea afacerii. Fiecare serviciu este personalizat în funcție de nevoile specifice ale clientului.'
      },
      {
        id: 'general-2',
        question: 'Cum pot deveni client EgoTax?',
        answer: 'Procesul este simplu: contactați-ne telefonic sau prin formularul de contact, programați o consultație gratuită în care analizăm nevoile dumneavoastră, primiti o ofertă personalizată, iar după acceptare începem colaborarea. Întregul proces poate fi finalizat în 1-2 zile lucrătoare.'
      },
      {
        id: 'general-3',
        question: 'Lucrați cu companii din toate domeniile?',
        answer: 'Da, avem experiență în diverse industrii: comerț, servicii, IT, construcții, producție, HoReCa, transport și multe altele. Cunoaștem specificul fiscal al fiecărui domeniu și oferim soluții adaptate.'
      },
    ]
  },
  {
    id: 'documente',
    title: 'Documente și declarații',
    icon: FileText,
    questions: [
      {
        id: 'doc-1',
        question: 'Ce documente sunt necesare pentru depunerea declarației fiscale?',
        answer: 'Pentru depunerea declarației sunt necesare: adeverința de venituri, documentele de cheltuieli (chitanțe, contracte), adeverințele de conturi bancare, documentele de proprietate imobiliară și alte bunuri. Lista completă depinde de situația dumneavoastră - vă ajutăm să determinăm documentele necesare individual.'
      },
      {
        id: 'doc-2',
        question: 'Până când trebuie depusă declarația?',
        answer: 'Declarația pentru anul 2025 trebuie depusă până la 31 martie 2026. Dacă ați obținut venituri de la care nu s-a reținut impozitul sau doriți să obțineți deduceri fiscale - nu întârziați cu depunerea. Vă ajutăm să pregătiți toate documentele la timp.'
      },
      {
        id: 'doc-3',
        question: 'Cum transmit documentele contabile?',
        answer: 'Puteți transmite documentele prin email, prin platforma noastră online sau le putem prelua personal. Acceptăm atât documente în format fizic, cât și digital. Pentru comoditate, recomandăm digitalizarea documentelor.'
      },
      {
        id: 'doc-4',
        question: 'Pot obține deduceri fiscale pentru anii trecuți?',
        answer: 'Da, puteți depune declarații și obține deduceri pentru ultimii 3 ani. De exemplu, în 2026 puteți obține deduceri pentru 2023, 2024 și 2025. Aceasta se referă la deducerile imobiliare, sociale și de investiții.'
      },
    ]
  },
  {
    id: 'costuri',
    title: 'Costuri și plăți',
    icon: Calculator,
    questions: [
      {
        id: 'cost-1',
        question: 'Cât costă serviciile de contabilitate?',
        answer: 'Costul depinde de complexitatea afacerii, volumul de tranzacții și serviciile necesare. Oferim pachete personalizate începând de la 3000 MDL/lună pentru afaceri mici. Contactați-ne pentru o ofertă personalizată.'
      },
      {
        id: 'cost-2',
        question: 'Consultația inițială este gratuită?',
        answer: 'Da, prima consultație este întotdeauna gratuită. În cadrul acesteia analizăm situația dumneavoastră, identificăm nevoile și propunem soluții optime. Nu există nicio obligație de a continua colaborarea.'
      },
      {
        id: 'cost-3',
        question: 'Ce metode de plată acceptați?',
        answer: 'Acceptăm plăți prin transfer bancar, card bancar și numerar. Emitem factură fiscală pentru toate serviciile prestate. Oferim și posibilitatea plății în rate pentru proiecte mai ample.'
      },
      {
        id: 'cost-4',
        question: 'Există costuri ascunse?',
        answer: 'Nu, toate costurile sunt transparente și comunicate din start. Oferta pe care o primiți include toate serviciile convenite. Orice serviciu suplimentar este discutat și agreat în prealabil.'
      },
    ]
  },
  {
    id: 'termene',
    title: 'Termene și sancțiuni',
    icon: Clock,
    questions: [
      {
        id: 'term-1',
        question: 'Ce se întâmplă dacă nu depun declarația la timp?',
        answer: 'Pentru depunerea întârziată a declarației este prevăzută o amendă de la 1000 lei. Dacă există impozit de plătit, se calculează în plus penalități pentru fiecare zi de întârziere. Mai bine să nu riscați - contactați-ne și vă ajutăm să aranjați totul corect și la timp.'
      },
      {
        id: 'term-2',
        question: 'Cât de repede pot obține deducerea fiscală?',
        answer: 'Procedura standard durează până la 4 luni: 3 luni pentru verificarea camerală și 1 lună pentru returnarea banilor. Vă ajutăm să pregătiți toate documentele corect din prima încercare, pentru a evita solicitări suplimentare și a accelera procesul.'
      },
      {
        id: 'term-3',
        question: 'Care sunt termenele pentru raportările lunare?',
        answer: 'Declarațiile TVA se depun până pe data de 25 a lunii următoare. Dările de seamă privind salariile - până pe data de 25. Rapoartele statistice au termene variabile. Monitorizăm toate termenele și vă notificăm din timp.'
      },
    ]
  },
  {
    id: 'controale',
    title: 'Controale fiscale',
    icon: Shield,
    questions: [
      {
        id: 'control-1',
        question: 'Ajutați la controalele fiscale?',
        answer: 'Da, oferim asistență completă în timpul controalelor fiscale: pregătirea documentelor, reprezentare în fața inspectorilor fiscali, contestarea eventualelor decizii nefavorabile și consultanță post-control pentru evitarea problemelor viitoare.'
      },
      {
        id: 'control-2',
        question: 'Cum mă pot pregăti pentru un control fiscal?',
        answer: 'Vă recomandăm să aveți toate documentele în ordine, să verificați concordanța între declarații și evidența contabilă, să pregătiți explicații pentru tranzacțiile atipice. Oferim servicii de audit preventiv care identifică și corectează problemele înainte de control.'
      },
      {
        id: 'control-3',
        question: 'Ce fac dacă am primit o amendă fiscală?',
        answer: 'Analizăm legalitatea amenzii și posibilitățile de contestare. Dacă amenda este justificată, vă ajutăm să o achitați corect și să evitați situații similare. Dacă există motive de contestare, pregătim documentația necesară.'
      },
    ]
  },
  {
    id: 'colaborare',
    title: 'Colaborare',
    icon: Users,
    questions: [
      {
        id: 'colab-1',
        question: 'Cum comunicăm pe parcursul colaborării?',
        answer: 'Comunicăm prin canalele preferate de dumneavoastră: telefon, email, WhatsApp, Viber sau Telegram. Aveți acces direct la contabilul responsabil de dosarul dumneavoastră. Organizăm întâlniri regulate pentru a discuta situația financiară.'
      },
      {
        id: 'colab-2',
        question: 'Pot schimba pachetul de servicii pe parcurs?',
        answer: 'Da, pachetele sunt flexibile și pot fi ajustate în funcție de evoluția afacerii dumneavoastră. Upgrade-ul sau downgrade-ul se face simplu, fără penalități sau formalități complicate.'
      },
      {
        id: 'colab-3',
        question: 'Ce garanții oferiți pentru calitatea serviciilor?',
        answer: 'Garantăm acuratețea calculelor și respectarea termenelor legale. În cazul unor erori din partea noastră, acoperim eventualele penalități. Avem asigurare de răspundere profesională pentru protecția suplimentară a clienților.'
      },
    ]
  },
];
