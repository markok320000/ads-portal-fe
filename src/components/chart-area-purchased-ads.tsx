"use client"

import * as React from "react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

import {useIsMobile} from "@/hooks/use-mobile"
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {ToggleGroup, ToggleGroupItem,} from "@/components/ui/toggle-group"

export const description = "Purchased ads chart"

// Mock data for purchased ads over time
const chartData = [
    {date: "2024-04-01", purchasedAds: 12},
    {date: "2024-04-02", purchasedAds: 8},
    {date: "2024-04-03", purchasedAds: 15},
    {date: "2024-04-04", purchasedAds: 22},
    {date: "2024-04-05", purchasedAds: 18},
    {date: "2024-04-06", purchasedAds: 25},
    {date: "2024-04-07", purchasedAds: 14},
    {date: "2024-04-08", purchasedAds: 28},
    {date: "2024-04-09", purchasedAds: 9},
    {date: "2024-04-10", purchasedAds: 19},
    {date: "2024-04-11", purchasedAds: 24},
    {date: "2024-04-12", purchasedAds: 21},
    {date: "2024-04-13", purchasedAds: 27},
    {date: "2024-04-14", purchasedAds: 16},
    {date: "2024-04-15", purchasedAds: 11},
    {date: "2024-04-16", purchasedAds: 13},
    {date: "2024-04-17", purchasedAds: 30},
    {date: "2024-04-18", purchasedAds: 26},
    {date: "2024-04-19", purchasedAds: 17},
    {date: "2024-04-20", purchasedAds: 10},
    {date: "2024-04-21", purchasedAds: 14},
    {date: "2024-04-22", purchasedAds: 20},
    {date: "2024-04-23", purchasedAds: 15},
    {date: "2024-04-24", purchasedAds: 23},
    {date: "2024-04-25", purchasedAds: 19},
    {date: "2024-04-26", purchasedAds: 8},
    {date: "2024-04-27", purchasedAds: 29},
    {date: "2024-04-28", purchasedAds: 12},
    {date: "2024-04-29", purchasedAds: 21},
    {date: "2024-04-30", purchasedAds: 31},
    {date: "2024-05-01", purchasedAds: 16},
    {date: "2024-05-02", purchasedAds: 24},
    {date: "2024-05-03", purchasedAds: 18},
    {date: "2024-05-04", purchasedAds: 28},
    {date: "2024-05-05", purchasedAds: 32},
    {date: "2024-05-06", purchasedAds: 35},
    {date: "2024-05-07", purchasedAds: 25},
    {date: "2024-05-08", purchasedAds: 14},
    {date: "2024-05-09", purchasedAds: 17},
    {date: "2024-05-10", purchasedAds: 22},
    {date: "2024-05-11", purchasedAds: 20},
    {date: "2024-05-12", purchasedAds: 18},
    {date: "2024-05-13", purchasedAds: 15},
    {date: "2024-05-14", purchasedAds: 33},
    {date: "2024-05-15", purchasedAds: 30},
    {date: "2024-05-16", purchasedAds: 26},
    {date: "2024-05-17", purchasedAds: 34},
    {date: "2024-05-18", purchasedAds: 23},
    {date: "2024-05-19", purchasedAds: 17},
    {date: "2024-05-20", purchasedAds: 16},
    {date: "2024-05-21", purchasedAds: 9},
    {date: "2024-05-22", purchasedAds: 8},
    {date: "2024-05-23", purchasedAds: 21},
    {date: "2024-05-24", purchasedAds: 19},
    {date: "2024-05-25", purchasedAds: 18},
    {date: "2024-05-26", purchasedAds: 15},
    {date: "2024-05-27", purchasedAds: 31},
    {date: "2024-05-28", purchasedAds: 17},
    {date: "2024-05-29", purchasedAds: 10},
    {date: "2024-05-30", purchasedAds: 22},
    {date: "2024-05-31", purchasedAds: 16},
    {date: "2024-06-01", purchasedAds: 15},
    {date: "2024-06-02", purchasedAds: 32},
    {date: "2024-06-03", purchasedAds: 11},
    {date: "2024-06-04", purchasedAds: 29},
    {date: "2024-06-05", purchasedAds: 9},
    {date: "2024-06-06", purchasedAds: 20},
    {date: "2024-06-07", purchasedAds: 25},
    {date: "2024-06-08", purchasedAds: 26},
    {date: "2024-06-09", purchasedAds: 33},
    {date: "2024-06-10", purchasedAds: 14},
    {date: "2024-06-11", purchasedAds: 10},
    {date: "2024-06-12", purchasedAds: 34},
    {date: "2024-06-13", purchasedAds: 8},
    {date: "2024-06-14", purchasedAds: 28},
    {date: "2024-06-15", purchasedAds: 24},
    {date: "2024-06-16", purchasedAds: 25},
    {date: "2024-06-17", purchasedAds: 36},
    {date: "2024-06-18", purchasedAds: 11},
    {date: "2024-06-19", purchasedAds: 23},
    {date: "2024-06-20", purchasedAds: 30},
    {date: "2024-06-21", purchasedAds: 15},
    {date: "2024-06-22", purchasedAds: 21},
    {date: "2024-06-23", purchasedAds: 37},
    {date: "2024-06-24", purchasedAds: 12},
    {date: "2024-06-25", purchasedAds: 13},
    {date: "2024-06-26", purchasedAds: 29},
    {date: "2024-06-27", purchasedAds: 34},
    {date: "2024-06-28", purchasedAds: 14},
    {date: "2024-06-29", purchasedAds: 11},
    {date: "2024-06-30", purchasedAds: 31},
]

const chartConfig = {
    purchasedAds: {
        label: "Purchased Ads",
        color: "blue",
    },
}

export function ChartAreaPurchasedAds() {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("90d")

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") daysToSubtract = 30
        else if (timeRange === "7d") daysToSubtract = 7
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Purchased Ads</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Total for the last 3 months
                    </span>
                    <span className="@[540px]/card:hidden">Last 3 months</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months"/>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillPurchasedAds" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-purchasedAds)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-purchasedAds)" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {month: "short", day: "numeric"})
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric"
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="purchasedAds"
                            type="natural"
                            fill="url(#fillPurchasedAds)"
                            stroke="var(--color-purchasedAds)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
