'use client';

import { useState, useEffect } from 'react';
import type { CalculatorPrices, OperationsRange } from '@/app/api/calculator-prices/route';

// Re-export types
export type { CalculatorPrices, OperationsRange, PriceItem } from '@/app/api/calculator-prices/route';

// Default prices (fallback if API fails)
const defaultPrices: CalculatorPrices = {
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

export function useCalculatorPrices() {
  const [prices, setPrices] = useState<CalculatorPrices>(defaultPrices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrices() {
      try {
        const response = await fetch('/api/calculator-prices');
        if (!response.ok) throw new Error('Failed to fetch prices');

        const data = await response.json();
        if (!cancelled) {
          // Merge with defaults to ensure all fields exist
          setPrices({
            ...defaultPrices,
            ...data,
            legalForms: data.legalForms?.length ? data.legalForms : defaultPrices.legalForms,
            activityTypes: data.activityTypes?.length ? data.activityTypes : defaultPrices.activityTypes,
            operationsRanges: data.operationsRanges?.length ? data.operationsRanges : defaultPrices.operationsRanges,
          });
        }
      } catch (err) {
        console.error('Error fetching calculator prices:', err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load prices');
          // Keep default prices on error
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPrices();

    return () => {
      cancelled = true;
    };
  }, []);

  return { prices, loading, error };
}

// Helper function to get operations price for a given count
export function getOperationsPrice(count: number, ranges: OperationsRange[]): number {
  // Find the range that contains this count
  const range = ranges.find(r => count >= r.min && count <= r.max);
  if (range) return range.price;

  // If count is higher than all ranges, use the last one
  if (ranges.length > 0 && count > ranges[ranges.length - 1].max) {
    return ranges[ranges.length - 1].price;
  }

  // Default fallback
  return 500;
}

// Helper function to get operations range label
export function getOperationsRangeLabel(count: number, ranges: OperationsRange[]): string {
  const range = ranges.find(r => count >= r.min && count <= r.max);
  if (range) return range.label;

  if (ranges.length > 0 && count > ranges[ranges.length - 1].max) {
    return `${ranges[ranges.length - 1].max}+`;
  }

  return `${count}`;
}

// Helper function to calculate cost based on prices
export function calculateCost(
  data: {
    legalForm: string;
    activityTypes: string[];
    operationsCount: number;
    hasAdditionalActivity: boolean;
    isVATpayer: boolean;
    employeesCount: number;
    cashRegisters: number;
    posTerminals: number;
    vehicles: number;
    individualRentals: number;
    credits: number;
    leasing: number;
    businessTrips: number;
    bankAccounts: number;
  },
  prices: CalculatorPrices
): number {
  let cost = 0;

  // Base cost by legal form
  const legalFormPrice = prices.legalForms.find(f => f.key === data.legalForm);
  cost += legalFormPrice?.price || 1000; // default if not found

  // Activity types cost (each type has its own price)
  for (const actType of data.activityTypes) {
    const actPrice = prices.activityTypes.find(a => a.key === actType);
    cost += actPrice?.price || 500;
  }

  // Operations cost (fixed ranges)
  cost += getOperationsPrice(data.operationsCount, prices.operationsRanges);

  // Additional services
  if (data.hasAdditionalActivity) cost += prices.additional.additionalActivity;
  if (data.isVATpayer) cost += prices.additional.vatPayer;

  // Per unit costs
  if (data.employeesCount > 0) cost += data.employeesCount * prices.perUnit.employees;
  if (data.bankAccounts > 1) cost += (data.bankAccounts - 1) * prices.perUnit.bankAccounts;

  // Equipment costs
  if (data.cashRegisters > 0) cost += data.cashRegisters * prices.equipment.cashRegisters;
  if (data.posTerminals > 0) cost += data.posTerminals * prices.equipment.posTerminals;
  if (data.vehicles > 0) cost += data.vehicles * prices.equipment.vehicles;
  if (data.individualRentals > 0) cost += data.individualRentals * prices.equipment.individualRentals;
  if (data.credits > 0) cost += data.credits * prices.equipment.credits;
  if (data.leasing > 0) cost += data.leasing * prices.equipment.leasing;
  if (data.businessTrips > 0) cost += data.businessTrips * prices.equipment.businessTrips;

  return cost;
}
