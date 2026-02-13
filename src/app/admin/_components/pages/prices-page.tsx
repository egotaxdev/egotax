import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit } from 'lucide-react';
import type { CalculatorPriceItem } from '../../_types';
import { CATEGORY_NAMES } from '../../_constants';

interface PricesPageProps {
  calculatorPrices: CalculatorPriceItem[];
  onEditPrice: (price: CalculatorPriceItem) => void;
}

export function PricesPage({ calculatorPrices, onEditPrice }: PricesPageProps) {
  const grouped = calculatorPrices.reduce((acc, price) => {
    if (!acc[price.category]) acc[price.category] = [];
    acc[price.category].push(price);
    return acc;
  }, {} as Record<string, CalculatorPriceItem[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Prețuri Calculator</h2>
        <p className="text-muted-foreground">Gestionați prețurile pentru calculatorul de costuri</p>
      </div>

      {Object.entries(grouped).map(([category, prices]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-lg">{CATEGORY_NAMES[category] || category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Denumire</TableHead>
                  <TableHead>Cheie</TableHead>
                  <TableHead>Descriere</TableHead>
                  <TableHead className="text-right">Preț (MDL)</TableHead>
                  <TableHead>Per unitate</TableHead>
                  <TableHead className="text-right">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.sort((a, b) => a.sort_order - b.sort_order).map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.label}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{price.key}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{price.description || '-'}</TableCell>
                    <TableCell className="text-right font-bold">{price.price}</TableCell>
                    <TableCell>
                      {price.is_per_unit ? <Badge variant="outline" className="text-xs">Per unitate</Badge> : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => onEditPrice(price)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {calculatorPrices.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>Nu sunt prețuri configurate.</p>
            <p className="text-sm mt-2">
              Rulați scriptul SQL din <code className="bg-muted px-1 rounded">supabase_calculator_prices.sql</code> pentru a adăuga prețurile implicite.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
