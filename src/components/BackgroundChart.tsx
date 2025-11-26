'use client';

import { ChartAreaGradient } from '@/components/ui/shadcn-io/area-chart-09';

const AreaChart09 = () => (
  <ChartAreaGradient />
);

export default function BackgroundChart() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 group cursor-pointer">
      <div className="w-full h-full flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-40 pointer-events-none">
        <div className="w-full h-full max-w-none transform transition-transform duration-500 ease-out group-hover:rotate-1">
          <AreaChart09 />
        </div>
      </div>
      
      {/* Дополнительные декоративные элементы для усиления эффекта */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none transition-all duration-700 group-hover:from-blue-500/10 group-hover:to-purple-500/10" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse transition-all duration-500 group-hover:scale-150 group-hover:from-blue-400/20 group-hover:to-purple-400/20" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse transition-all duration-500 group-hover:scale-125 group-hover:from-green-400/20 group-hover:to-blue-400/20" style={{ animationDelay: '2s' }} />
      
      {/* Новые анимированные элементы при ховере */}
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-[#FFB343]/0 to-[#FF9F2E]/0 rounded-full blur-2xl transition-all duration-700 group-hover:w-40 group-hover:h-40 group-hover:from-[#FFB343]/15 group-hover:to-[#FF9F2E]/15 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}