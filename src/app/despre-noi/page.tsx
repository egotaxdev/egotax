import { Metadata } from "next";
import DespreNoiContent from "@/components/pages/DespreNoiContent";

export const metadata: Metadata = {
  title: "Despre Noi",
  description:
    "EgoTax - companie de contabilitate cu peste 7 ani de experiență în Moldova. Echipă de profesioniști certificați, 500+ clienți activi, servicii personalizate de contabilitate și consultanță fiscală.",
  keywords: [
    "despre EgoTax",
    "companie contabilitate Moldova",
    "echipa contabilitate Chișinău",
    "servicii contabile profesionale",
    "experiență contabilitate",
  ],
  openGraph: {
    title: "Despre Noi | EgoTax",
    description:
      "Peste 7 ani de experiență în contabilitate și consultanță fiscală în Moldova. Cunoașteți echipa EgoTax.",
    url: "https://egotax.md/despre-noi",
    type: "website",
  },
  alternates: {
    canonical: "https://egotax.md/despre-noi",
  },
};

export default function DesprePage() {
  return <DespreNoiContent />;
}
