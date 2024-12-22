"use client"

import { TrendingUp, CalendarDays } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTheme } from "./theme-provider"

export const description = "A linear area chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function FuelChart() {
  const theme = useTheme()
  return (
    <Card className="border-hidden">
      <CardHeader className="relative flex flex-row justify-between w-full items-center">
        <div className="gap-2 flex flex-col">
          <CardTitle className="text-black dark:text-white">Carburant consommé</CardTitle>
          <CardDescription className="text-gray-400">Janvier - Juin 2024</CardDescription>
        </div>
        <div className="hover:bg-gray-300/30 dark:hover:bg-gray-500/30 cursor-pointer p-2 rounded absolute top-2 right-2">
          <CalendarDays color={`${theme.theme === 'dark' ? 'white' : 'black'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              tickFormatter={(value) => value.slice(0, 3)}
              style={{fill: theme.theme === 'dark' ? "#fff" : "#000" }} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className={`${theme.theme === 'dark' ? "bg-white text-black" : "bg-black text-white"}`} indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="#07BAD1"
              fillOpacity={0.2}
              stroke="#07BAD1"
              strokeWidth={3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="hidden">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
