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

export const description = "A stacked area chart with expand stacking"

const chartData = [
    { month: "January", oilChange: 186, wheels: 80, brakes: 45 },
    { month: "February", oilChange: 305, wheels: 200, brakes: 100 },
    { month: "March", oilChange: 237, wheels: 120, brakes: 150 },
    { month: "April", oilChange: 73, wheels: 190, brakes: 50 },
    { month: "May", oilChange: 209, wheels: 130, brakes: 100 },
    { month: "June", oilChange: 214, wheels: 140, brakes: 160 },
]

const chartConfig = {
    oilChange: {
        label: "Oil Change",
        color: "hsl(var(--chart-1))",
    },
    wheels: {
        label: "Wheels",
        color: "hsl(var(--chart-2))",
    },
    brakes: {
        label: "Brakes",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function MaintenanceChart() {
    const theme = useTheme()
    return (
        <Card className="border-none">
            <CardHeader className="relative flex flex-row justify-between w-full items-center">
                <div className="gap-2 flex flex-col">
                    <CardTitle className="text-black dark:text-white">Coût total de maintenance</CardTitle>
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
                            top: 12,
                        }}
                        stackOffset="expand"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                            style={{ fill: theme.theme === 'dark' ? "#fff" : "#000" }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent className={`${theme.theme === 'dark' ? "bg-white text-black" : "bg-black text-white"}`} indicator="line" />}
                        />
                        <Area
                            dataKey="brakes"
                            type="natural"
                            fill="#07BAD1"
                            fillOpacity={0.2}
                            stroke="#07BAD1"
                            strokeWidth={3}
                            stackId="a"
                        />
                        <Area
                            dataKey="wheels"
                            type="natural"
                            fill="#a855f7"
                            fillOpacity={0.2}
                            stroke="#a855f7"
                            strokeWidth={3}
                            stackId="a"
                        />
                        <Area
                            dataKey="oilChange"
                            type="natural"
                            fill="#f97316"
                            fillOpacity={0.2}
                            stroke="#f97316"
                            strokeWidth={3}
                            stackId="a"
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
