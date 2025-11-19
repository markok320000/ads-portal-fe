"use client"

import * as React from "react"
import {Badge} from "@/components/ui/badge"

export type AdApprovalState = "rejected" | "pending" | "running" | "completed"
export type AdType = "text" | "photo" | "video"

export interface AdItem {
    id: number
    title: string
    adType: "text" | "photo" | "video"
    viewsBought: number
    price: number
    totalPricePaid: number
    purchaseDate: string
    startDate: string
    approvalState: AdApprovalState
}

export function AdsTable({ads}: { ads: AdItem[] }) {
    const rows = React.useMemo(
        () => ads.filter((a) => a.approvalState === "pending" || a.approvalState === "running"),
        [ads]
    )

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

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white">
            <div className="overflow-x-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="h-12 px-4 text-left align-middle font-semibold text-gray-900">Title</th>
                        <th className="h-12 px-4 text-left align-middle font-semibold text-gray-900">Type</th>
                        <th className="h-12 px-4 text-right align-middle font-semibold text-gray-900">Views Bought</th>
                        <th className="h-12 px-4 text-right align-middle font-semibold text-gray-900">Price</th>
                        <th className="h-12 px-4 text-right align-middle font-semibold text-gray-900">Total Paid</th>
                        <th className="h-12 px-4 text-left align-middle font-semibold text-gray-900">Purchase Date</th>
                        <th className="h-12 px-4 text-left align-middle font-semibold text-gray-900">Start Date</th>
                        <th className="h-12 px-4 text-left align-middle font-semibold text-gray-900">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="h-32 text-center text-gray-500">
                                <div className="flex flex-col items-center justify-center gap-2 py-8">
                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                    </svg>
                                    <p className="font-medium">No running or pending ads</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        rows.map((ad) => (
                            <tr key={ad.id} className="border-b transition-colors hover:bg-gray-50">
                                <td className="p-4 align-middle font-medium text-gray-900">{ad.title}</td>
                                <td className="p-4 align-middle">
                                    <Badge variant="outline"
                                           className={`px-2.5 py-0.5 capitalize font-medium ${getTypeColor(ad.adType)}`}>
                                        {ad.adType}
                                    </Badge>
                                </td>
                                <td className="p-4 align-middle text-right font-medium text-gray-900">
                                    {ad.viewsBought.toLocaleString()}
                                </td>
                                <td className="p-4 align-middle text-right font-medium text-gray-900">
                                    ${ad.price.toFixed(2)}
                                </td>
                                <td className="p-4 align-middle text-right font-semibold text-gray-900">
                                    ${ad.totalPricePaid.toFixed(2)}
                                </td>
                                <td className="p-4 align-middle text-gray-600">{formatDate(ad.purchaseDate)}</td>
                                <td className="p-4 align-middle text-gray-600">{formatDate(ad.startDate)}</td>
                                <td className="p-4 align-middle">
                                    <Badge variant={getStatusVariant(ad.approvalState)}
                                           className="px-2.5 py-0.5 capitalize font-medium">
                                        {ad.approvalState}
                                    </Badge>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
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