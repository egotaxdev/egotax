import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

// Cache prices for 5 minutes
let cachedPrices: CalculatorPrices | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface PriceItem {
  id: string;
  key: string;
  label: string;
  description?: string;
  price: number;
  is_per_unit: boolean;
  sort_order: number;
}

export interface OperationsRange {
  key: string;
  label: string;
  min: number;
  max: number;
  price: number;
}

export interface CalculatorPrices {
  legalForms: PriceItem[];
  activityTypes: PriceItem[];
  operationsRanges: OperationsRange[];
  additional: {
    additionalActivity: number;
    vatPayer: number;
  };
  perUnit: {
    employees: number;
    bankAccounts: number;
  };
  equipment: {
    cashRegisters: number;
    posTerminals: number;
    vehicles: number;
    individualRentals: number;
    credits: number;
    leasing: number;
    businessTrips: number;
  };
}

// Parse operations range key like "1-10", "11-20" etc
function parseOperationsKey(key: string): { min: number; max: number } {
  const [min, max] = key.split('-').map(Number);
  return { min: min || 0, max: max || 999 };
}

export async function GET() {
  try {
    // Check cache
    if (cachedPrices && Date.now() - cacheTime < CACHE_DURATION) {
      return NextResponse.json(cachedPrices, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    const { data, error } = await supabase
      .from('calculator_prices')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;

    // Transform data into structured format
    const prices: CalculatorPrices = {
      legalForms: [],
      activityTypes: [],
      operationsRanges: [],
      additional: {
        additionalActivity: 1000,
        vatPayer: 1000,
      },
      perUnit: {
        employees: 150,
        bankAccounts: 100,
      },
      equipment: {
        cashRegisters: 300,
        posTerminals: 150,
        vehicles: 300,
        individualRentals: 100,
        credits: 250,
        leasing: 200,
        businessTrips: 100,
      },
    };

    for (const item of data || []) {
      switch (item.category) {
        case 'legal_form':
          prices.legalForms.push({
            id: item.id,
            key: item.key,
            label: item.label,
            description: item.description,
            price: item.price,
            is_per_unit: item.is_per_unit,
            sort_order: item.sort_order,
          });
          break;

        case 'activity_type':
          prices.activityTypes.push({
            id: item.id,
            key: item.key,
            label: item.label,
            description: item.description,
            price: item.price,
            is_per_unit: item.is_per_unit,
            sort_order: item.sort_order,
          });
          break;

        case 'operations': {
          const { min, max } = parseOperationsKey(item.key);
          prices.operationsRanges.push({
            key: item.key,
            label: item.label,
            min,
            max,
            price: item.price,
          });
          break;
        }

        case 'additional':
          if (item.key === 'additional_activity') {
            prices.additional.additionalActivity = item.price;
          } else if (item.key === 'vat_payer') {
            prices.additional.vatPayer = item.price;
          }
          break;

        case 'per_unit':
          if (item.key === 'employees') {
            prices.perUnit.employees = item.price;
          } else if (item.key === 'bank_accounts') {
            prices.perUnit.bankAccounts = item.price;
          }
          break;

        case 'equipment':
          switch (item.key) {
            case 'cash_registers':
              prices.equipment.cashRegisters = item.price;
              break;
            case 'pos_terminals':
              prices.equipment.posTerminals = item.price;
              break;
            case 'vehicles':
              prices.equipment.vehicles = item.price;
              break;
            case 'individual_rentals':
              prices.equipment.individualRentals = item.price;
              break;
            case 'credits':
              prices.equipment.credits = item.price;
              break;
            case 'leasing':
              prices.equipment.leasing = item.price;
              break;
            case 'business_trips':
              prices.equipment.businessTrips = item.price;
              break;
          }
          break;
      }
    }

    // Sort operations ranges by min value
    prices.operationsRanges.sort((a, b) => a.min - b.min);

    // Update cache
    cachedPrices = prices;
    cacheTime = Date.now();

    return NextResponse.json(prices, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching calculator prices:', error);

    // Return fallback prices on error
    return NextResponse.json({
      legalForms: [
        { id: '1', key: 'srl', label: 'SRL', description: 'Societate cu Răspundere Limitată', price: 500, is_per_unit: false, sort_order: 1 },
        { id: '2', key: 'ii', label: 'I.I.', description: 'Întreprinzător Individual', price: 500, is_per_unit: false, sort_order: 2 },
        { id: '3', key: 'ics', label: 'ICS', description: 'Întreprindere cu Capital Străin', price: 1000, is_per_unit: false, sort_order: 3 },
        { id: '4', key: 'ao', label: 'AO', description: 'Asociație Obștească', price: 1000, is_per_unit: false, sort_order: 4 },
        { id: '5', key: 'sa', label: 'SA', description: 'Societate pe Acțiuni', price: 2500, is_per_unit: false, sort_order: 5 },
        { id: '6', key: 'parc-it', label: 'Parc IT', description: 'Rezident al Parcului IT', price: 1000, is_per_unit: false, sort_order: 6 },
        { id: '7', key: 'apc', label: 'APC', description: 'Asociația de Proprietari', price: 1000, is_per_unit: false, sort_order: 7 },
      ],
      activityTypes: [
        { id: '10', key: 'servicii', label: 'Servicii', price: 500, is_per_unit: false, sort_order: 1 },
        { id: '11', key: 'logistics', label: 'Logistică/Transport/Expediții', price: 3000, is_per_unit: false, sort_order: 2 },
        { id: '12', key: 'import-export', label: 'Import/export', price: 1000, is_per_unit: false, sort_order: 3 },
        { id: '13', key: 'trade', label: 'Comerț', price: 1000, is_per_unit: false, sort_order: 4 },
        { id: '14', key: 'production', label: 'Producere', price: 1000, is_per_unit: false, sort_order: 5 },
        { id: '15', key: 'construction', label: 'Construcții', price: 1000, is_per_unit: false, sort_order: 6 },
        { id: '16', key: 'tourism', label: 'Turism', price: 2000, is_per_unit: false, sort_order: 7 },
        { id: '17', key: 'agriculture', label: 'Agricultură', price: 1000, is_per_unit: false, sort_order: 8 },
        { id: '18', key: 'horeca', label: 'Alimentație Publică (HoReCa)', price: 1500, is_per_unit: false, sort_order: 9 },
      ],
      operationsRanges: [
        { key: '1-10', label: '1–10 operații', min: 1, max: 10, price: 500 },
        { key: '11-20', label: '11–20 operații', min: 11, max: 20, price: 1000 },
        { key: '21-40', label: '21–40 operații', min: 21, max: 40, price: 1500 },
        { key: '41-60', label: '41–60 operații', min: 41, max: 60, price: 2000 },
        { key: '61-80', label: '61–80 operații', min: 61, max: 80, price: 2500 },
        { key: '81-100', label: '81–100 operații', min: 81, max: 100, price: 3000 },
        { key: '101-120', label: '101–120 operații', min: 101, max: 120, price: 3500 },
        { key: '121-140', label: '121–140 operații', min: 121, max: 140, price: 4000 },
      ],
      additional: { additionalActivity: 1000, vatPayer: 1000 },
      perUnit: { employees: 150, bankAccounts: 100 },
      equipment: {
        cashRegisters: 300,
        posTerminals: 150,
        vehicles: 300,
        individualRentals: 100,
        credits: 250,
        leasing: 200,
        businessTrips: 100,
      },
    } as CalculatorPrices, { status: 200 });
  }
}
