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
        question: 'Ce servicii oferă Ego Tax?',
        answer: 'EgoTax oferă o gamă completă de servicii contabile și fiscale: evidență contabilă, consultanță fiscală, restabilirea evidenței contabile, analiză și diagnostic financiar, precum și suport în inițierea afacerii. Fiecare serviciu este personalizat în funcție de nevoile specifice ale clientului.'
      },
      {
        id: 'general-2',
        question: 'Cum pot deveni client Ego Tax?',
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
        question: 'Ce acte trebuie să transmit lunar la contabilitate?',
        answer: 'Aici depinde de forma juridică, tipul activității și a regimului de impozitare, dar de regulă lunar trebuie să expediați următoarele acte primare: facturi fiscale, extrase de cont, bonuri de casă, deconturi, dispozițiile de plată prin casă, registrul ECC completat, actele referitor plăților salariale (tabele de pontaj, borderouri de calcul), contractele individuale de muncă noi și lista nu se limitează la acestea.'
      },
      {
        id: 'doc-2',
        question: 'Cum transmit documentele contabile?',
        answer: 'Puteți aduce documentele fizic sau le puteți expedia în format electronic prin email, telegram/viber sau le putem prelua personal.'
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
        answer: 'Costul depinde de complexitatea afacerii, volumul de tranzacții și serviciile necesare. Oferim pachete personalizate începând de la 1500 MDL/lună pentru afaceri mici. Contactați-ne pentru o ofertă personalizată.'
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
        answer: 'Pentru depunerea întârziată a declarației riscați amendă, în unele cazuri se ajunge la blocarea conturilor bancare. Dacă există impozite restante, se calculează în plus penalități pentru fiecare zi de întârziere. Contactați-ne și vă ajutăm să aranjați totul corect și la timp.'
      },
      {
        id: 'term-2',
        question: 'Care sunt termenele pentru raportările lunare?',
        answer: 'Declarațiile TVA și IPC 21 se depun până pe data de 25 a lunii următoare. Rapoartele statistice au termene variabile. Monitorizăm toate termenele și vă notificăm din timp.'
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
        question: 'Ajutați în cazul controalelor fiscale?',
        answer: 'Da, oferim asistență completă în timpul controalelor fiscale: pregătirea documentelor, reprezentare în fața inspectorilor fiscali, consultanță post-control.'
      },
      {
        id: 'control-2',
        question: 'Cum mă pot pregăti pentru un control fiscal?',
        answer: 'Vă recomandăm să aveți toate documentele în ordine, să verificați concordanța între declarații și evidența contabilă, să pregătiți explicații pentru tranzacțiile atipice. Oferim servicii de analiză preventivă care are drept scop identificarea și corectarea erorilor.'
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
        question: 'Prețul serviciilor poate fi modificat?',
        answer: 'Prețul este flexibil și poate fi ajustat în dependență de evoluția afacerii dumneavoastră.'
      },
      {
        id: 'colab-3',
        question: 'Ce garanții oferiți pentru calitatea serviciilor?',
        answer: 'Garantăm acuratețea calculelor și respectarea termenelor legale. În cazul unor erori din partea noastră, ne asumăm răspunderea în conformitate cu contractul încheiat cu dumneavoastră.'
      },
    ]
  },
];
