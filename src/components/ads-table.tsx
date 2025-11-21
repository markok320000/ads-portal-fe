"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AdApprovalState, AdItem, AdType } from "@/models/ad-item";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, X } from "lucide-react";

interface AdsTableProps {
    ads: AdItem[]
    status: string | null
    type: string | null
    sort: string
    onStatusChange: (value: string | null) => void
    onTypeChange: (value: string | null) => void
    onSortChange: (value: string) => void
}

export function AdsTable({
    ads,
    status,
    type,
    sort,
    onStatusChange,
    onTypeChange,
    onSortChange
}: AdsTableProps) {

    const getStatusVariant = (status: AdApprovalState) => {
        switch (status) {
            case "running":
                return "default"
            case "pending":
                return "secondary"
            default:
                return "outline"
        }
    }

    const getTypeColor = (type: AdType) => {
        switch (type) {
            case "video":
                return "bg-purple-50 text-purple-700 border-purple-200"
            case "photo":
                return "bg-blue-50 text-blue-700 border-blue-200"
            case "text":
                return "bg-gray-50 text-gray-700 border-gray-200"
            default:
                return ""
        }
    }

    const toggleSort = () => {
        const [field, order] = sort.split(",")
        if (field === "purchaseDate") {
            onSortChange(`purchaseDate,${order === "asc" ? "desc" : "asc"}`)
        } else {
            onSortChange("purchaseDate,desc")
        }
    }

    const clearFilters = () => {
        onStatusChange(null)
        onTypeChange(null)
    }

    const hasFilters = status !== null || type !== null

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Select
                    value={status || "all"}
                    onValueChange={(val) => onStatusChange(val === "all" ? null : val)}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={type || "all"}
                    onValueChange={(val) => onTypeChange(val === "all" ? null : val)}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="photo">Photo</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Views Bought</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Total Paid</TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={toggleSort}
                                    className="-ml-4 h-8 data-[state=open]:bg-accent"
                                >
                                    Purchase Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 py-8">
                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="font-medium text-muted-foreground">No ads found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            ads.map((ad) => (
                                <TableRow key={ad.id}>
                                    <TableCell className="font-medium">{ad.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline"
                                            className={`px-2.5 py-0.5 capitalize font-medium ${getTypeColor(ad.adType)}`}>
                                            {ad.adType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {ad.viewsBought.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${ad.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                        ${ad.totalPricePaid.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{formatDate(ad.purchaseDate)}</TableCell>
                                    <TableCell className="text-muted-foreground">{formatDate(ad.startDate)}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(ad.approvalState)}
                                            className="px-2.5 py-0.5 capitalize font-medium">
                                            {ad.approvalState}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function formatDate(d: string) {
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}