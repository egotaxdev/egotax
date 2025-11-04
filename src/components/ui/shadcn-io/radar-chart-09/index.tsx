"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { useState, useEffect } from "react"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid and circle fill"

const chartData = [
  { month: "Ian", profit: 450000 },
  { month: "Feb", profit: 380000 },
  { month: "Mar", profit: 420000 },
  { month: "Apr", profit: 350000 },
  { month: "Mai", profit: 480000 },
  { month: "Iun", profit: 520000 },
]

const chartConfig = {
  profit: {
    label: "Profit Net (MDL)",
    color: "#ffe502",
  },
} satisfies ChartConfig

export function ChartRadarGridCircleFill({ isVisible = false }: { isVisible?: boolean }) {
  const [animatedData, setAnimatedData] = useState(chartData.map(item => ({ ...item, profit: 0 })))

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedData(chartData)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-80 h-80"
        >
          <RadarChart data={animatedData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-[#ffe502] opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="profit"
              fill="#ffe502"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </div>
    </div>
  )
}