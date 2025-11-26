"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with gradient fill"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FF8C00", // Оранжевый цвет для верхней линии
  },
  mobile: {
    label: "Mobile", 
    color: "#FFB343", // Желто-оранжевый цвет для нижней линии
  },
} satisfies ChartConfig

export function ChartAreaGradient() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="area-chart-09-fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="area-chart-09-fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="mobile"
          type="natural"
          fill="url(#area-chart-09-fillMobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#area-chart-09-fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}