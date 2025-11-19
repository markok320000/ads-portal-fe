"use client"

import * as React from "react"
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts"

import {useIsMobile} from "@/hooks/use-mobile"
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {ToggleGroup, ToggleGroupItem,} from "@/components/ui/toggle-group"

export const description = "Daily views chart"

// Original data combined into a single viewsPerDay value
const chartData = [
    {date: "2024-04-01", viewsPerDay: 372},
    {date: "2024-04-02", viewsPerDay: 277},
    {date: "2024-04-03", viewsPerDay: 287},
    {date: "2024-04-04", viewsPerDay: 502},
    {date: "2024-04-05", viewsPerDay: 663},
    {date: "2024-04-06", viewsPerDay: 641},
    {date: "2024-04-07", viewsPerDay: 425},
    {date: "2024-04-08", viewsPerDay: 729},
    {date: "2024-04-09", viewsPerDay: 169},
    {date: "2024-04-10", viewsPerDay: 451},
    {date: "2024-04-11", viewsPerDay: 677},
    {date: "2024-04-12", viewsPerDay: 502},
    {date: "2024-04-13", viewsPerDay: 722},
    {date: "2024-04-14", viewsPerDay: 357},
    {date: "2024-04-15", viewsPerDay: 290},
    {date: "2024-04-16", viewsPerDay: 328},
    {date: "2024-04-17", viewsPerDay: 806},
    {date: "2024-04-18", viewsPerDay: 774},
    {date: "2024-04-19", viewsPerDay: 423},
    {date: "2024-04-20", viewsPerDay: 239},
    {date: "2024-04-21", viewsPerDay: 337},
    {date: "2024-04-22", viewsPerDay: 394},
    {date: "2024-04-23", viewsPerDay: 368},
    {date: "2024-04-24", viewsPerDay: 677},
    {date: "2024-04-25", viewsPerDay: 465},
    {date: "2024-04-26", viewsPerDay: 205},
    {date: "2024-04-27", viewsPerDay: 803},
    {date: "2024-04-28", viewsPerDay: 302},
    {date: "2024-04-29", viewsPerDay: 555},
    {date: "2024-04-30", viewsPerDay: 834},
    {date: "2024-05-01", viewsPerDay: 385},
    {date: "2024-05-02", viewsPerDay: 603},
    {date: "2024-05-03", viewsPerDay: 437},
    {date: "2024-05-04", viewsPerDay: 805},
    {date: "2024-05-05", viewsPerDay: 871},
    {date: "2024-05-06", viewsPerDay: 1018},
    {date: "2024-05-07", viewsPerDay: 688},
    {date: "2024-05-08", viewsPerDay: 359},
    {date: "2024-05-09", viewsPerDay: 407},
    {date: "2024-05-10", viewsPerDay: 623},
    {date: "2024-05-11", viewsPerDay: 605},
    {date: "2024-05-12", viewsPerDay: 437},
    {date: "2024-05-13", viewsPerDay: 357},
    {date: "2024-05-14", viewsPerDay: 938},
    {date: "2024-05-15", viewsPerDay: 853},
    {date: "2024-05-16", viewsPerDay: 738},
    {date: "2024-05-17", viewsPerDay: 919},
    {date: "2024-05-18", viewsPerDay: 665},
    {date: "2024-05-19", viewsPerDay: 415},
    {date: "2024-05-20", viewsPerDay: 407},
    {date: "2024-05-21", viewsPerDay: 222},
    {date: "2024-05-22", viewsPerDay: 201},
    {date: "2024-05-23", viewsPerDay: 542},
    {date: "2024-05-24", viewsPerDay: 514},
    {date: "2024-05-25", viewsPerDay: 451},
    {date: "2024-05-26", viewsPerDay: 383},
    {date: "2024-05-27", viewsPerDay: 880},
    {date: "2024-05-28", viewsPerDay: 423},
    {date: "2024-05-29", viewsPerDay: 208},
    {date: "2024-05-30", viewsPerDay: 620},
    {date: "2024-05-31", viewsPerDay: 408},
    {date: "2024-06-01", viewsPerDay: 378},
    {date: "2024-06-02", viewsPerDay: 881},
    {date: "2024-06-03", viewsPerDay: 263},
    {date: "2024-06-04", viewsPerDay: 819},
    {date: "2024-06-05", viewsPerDay: 228},
    {date: "2024-06-06", viewsPerDay: 544},
    {date: "2024-06-07", viewsPerDay: 693},
    {date: "2024-06-08", viewsPerDay: 705},
    {date: "2024-06-09", viewsPerDay: 918},
    {date: "2024-06-10", viewsPerDay: 355},
    {date: "2024-06-11", viewsPerDay: 242},
    {date: "2024-06-12", viewsPerDay: 912},
    {date: "2024-06-13", viewsPerDay: 211},
    {date: "2024-06-14", viewsPerDay: 806},
    {date: "2024-06-15", viewsPerDay: 657},
    {date: "2024-06-16", viewsPerDay: 681},
    {date: "2024-06-17", viewsPerDay: 995},
    {date: "2024-06-18", viewsPerDay: 277},
    {date: "2024-06-19", viewsPerDay: 631},
    {date: "2024-06-20", viewsPerDay: 858},
    {date: "2024-06-21", viewsPerDay: 379},
    {date: "2024-06-22", viewsPerDay: 587},
    {date: "2024-06-23", viewsPerDay: 1010},
    {date: "2024-06-24", viewsPerDay: 312},
    {date: "2024-06-25", viewsPerDay: 331},
    {date: "2024-06-26", viewsPerDay: 812},
    {date: "2024-06-27", viewsPerDay: 938},
    {date: "2024-06-28", viewsPerDay: 349},
    {date: "2024-06-29", viewsPerDay: 263},
    {date: "2024-06-30", viewsPerDay: 846},
]

const chartConfig = {
    viewsPerDay: {
        label: "Views per Day",
        color: "blue",
    },
}

export function ChartAreaInteractive() {
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
                <CardTitle>Total Views</CardTitle>
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
                            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-viewsPerDay)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--color-viewsPerDay)" stopOpacity={0.1}/>
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
                            dataKey="viewsPerDay"
                            type="natural"
                            fill="url(#fillViews)"
                            stroke="var(--color-viewsPerDay)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
