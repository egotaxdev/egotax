import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Phone, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <span className="text-8xl md:text-9xl font-bold text-[#FFB343]">
            404
          </span>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Pagina nu a fost găsită
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Ne pare rău, dar pagina pe care o căutați nu există sau a fost
          mutată. Verificați adresa URL sau navigați către una din paginile
          noastre principale.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button asChild size="lg" className="bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            <Link href="/">
              <Home className="mr-2 w-4 h-4" />
              Pagina principală
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              <Phone className="mr-2 w-4 h-4" />
              Contactează-ne
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground mb-4">
            Poate vă interesează:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/servicii/servicii-contabile"
              className="text-sm text-[#FFB343] hover:underline"
            >
              Servicii contabile
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/servicii/consultanta-fiscala"
              className="text-sm text-[#FFB343] hover:underline"
            >
              Consultanță fiscală
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/calculator"
              className="text-sm text-[#FFB343] hover:underline"
            >
              Calculator
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/faq"
              className="text-sm text-[#FFB343] hover:underline"
            >
              FAQ
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
