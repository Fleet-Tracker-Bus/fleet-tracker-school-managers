"use client"

import { TrendingUp, CalendarDays } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A bar chart"

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

import { useTheme } from "./theme-provider"

export function SavedMoneyChart() {

  const theme = useTheme()

  return (
    <Card className="border-hidden">
      <CardHeader className="relative flex flex-row justify-between w-full items-center">
        <div className="gap-2 flex flex-col">
          <CardTitle className="text-black dark:text-white">Argent total économisé</CardTitle>
          <CardDescription className="text-gray-400">Janvier - Juin 2024</CardDescription>
        </div>
        <div className="hover:bg-gray-300/30 dark:hover:bg-gray-500/30 cursor-pointer p-2 rounded absolute top-2 right-2">
          <CalendarDays color={`${theme.theme === 'dark' ? 'white' : 'black'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart  className="text-white" accessibilityLayer data={chartData}>
            <CartesianGrid className="" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-white"
              style={{fill: theme.theme === 'dark' ? "#fff" : "#000" }} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className={`${theme.theme === 'dark' ? "bg-white text-black" : "bg-black text-white"}`} hideLabel />}
            />
            <Bar className="" dataKey="desktop" fill="#eeb70a" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm text-white hidden">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
