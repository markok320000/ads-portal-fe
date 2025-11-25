"use client"

import * as React from "react"
import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"

// Mock data for revenue over months
const monthlyRevenueData = [
    {month: "Jan", revenue: 18500},
    {month: "Feb", revenue: 22300},
    {month: "Mar", revenue: 19800},
    {month: "Apr", revenue: 25600},
    {month: "May", revenue: 28900},
    {month: "Jun", revenue: 31200},
    {month: "Jul", revenue: 27400},
    {month: "Aug", revenue: 33100},
    {month: "Sep", revenue: 29700},
    {month: "Oct", revenue: 35800},
    {month: "Nov", revenue: 38200},
    {month: "Dec", revenue: 42500},
]

// Mock data for revenue over the week
const weeklyRevenueData = [
    {day: "Mon", revenue: 1250},
    {day: "Tue", revenue: 1580},
    {day: "Wed", revenue: 1420},
    {day: "Thu", revenue: 1890},
    {day: "Fri", revenue: 2100},
    {day: "Sat", revenue: 1650},
    {day: "Sun", revenue: 980},
]

const monthlyChartConfig = {
    revenue: {
        label: "Revenue",
        color: "blue",
    },
}

const weeklyChartConfig = {
    revenue: {
        label: "Revenue",
        color: "blue",
    },
}

export function ChartBarRevenue() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Revenue Over Months */}
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Revenue Over Months</CardTitle>
                    <CardDescription>
                        Monthly revenue for the past year
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={monthlyChartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <BarChart data={monthlyRevenueData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => `$${value.toLocaleString()}`}
                                        indicator="line"
                                    />
                                }
                            />
                            <Bar
                                dataKey="revenue"
                                fill="var(--color-revenue)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Revenue Over Week */}
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Revenue Over Week</CardTitle>
                    <CardDescription>
                        Daily revenue for the current week
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={weeklyChartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <BarChart data={weeklyRevenueData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => `$${value.toLocaleString()}`}
                                        indicator="line"
                                    />
                                }
                            />
                            <Bar
                                dataKey="revenue"
                                fill="var(--color-revenue)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
