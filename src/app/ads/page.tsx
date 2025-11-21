"use client"

import { SiteHeader } from "@/components/site-header";
import { AdsTable } from "@/components/ads-table";
import { useAdsParams } from "@/hooks/use-ads-params";
import { AdItem } from "@/models/ad-item";
import { useMemo } from "react";

const MOCK_ADS: AdItem[] = [
    {
        id: 1,
        title: "Summer Sale Campaign",
        adType: "photo",
        viewsBought: 5000,
        price: 150.00,
        totalPricePaid: 150.00,
        purchaseDate: "2024-05-15T10:00:00Z",
        startDate: "2024-06-01T00:00:00Z",
        approvalState: "running"
    },
    {
        id: 2,
        title: "New Product Launch",
        adType: "video",
        viewsBought: 10000,
        price: 500.00,
        totalPricePaid: 500.00,
        purchaseDate: "2024-05-20T14:30:00Z",
        startDate: "2024-06-05T00:00:00Z",
        approvalState: "pending"
    },
    {
        id: 3,
        title: "Brand Awareness",
        adType: "text",
        viewsBought: 2000,
        price: 50.00,
        totalPricePaid: 50.00,
        purchaseDate: "2024-05-10T09:15:00Z",
        startDate: "2024-05-25T00:00:00Z",
        approvalState: "completed"
    },
    {
        id: 4,
        title: "Holiday Special",
        adType: "photo",
        viewsBought: 7500,
        price: 225.00,
        totalPricePaid: 225.00,
        purchaseDate: "2024-05-22T11:00:00Z",
        startDate: "2024-06-10T00:00:00Z",
        approvalState: "rejected"
    },
    {
        id: 5,
        title: "Flash Sale",
        adType: "text",
        viewsBought: 1500,
        price: 40.00,
        totalPricePaid: 40.00,
        purchaseDate: "2024-05-18T16:45:00Z",
        startDate: "2024-06-02T00:00:00Z",
        approvalState: "running"
    },
    {
        id: 6,
        title: "Tech Review",
        adType: "video",
        viewsBought: 12000,
        price: 600.00,
        totalPricePaid: 600.00,
        purchaseDate: "2024-05-25T13:20:00Z",
        startDate: "2024-06-08T00:00:00Z",
        approvalState: "pending"
    }
];

export default function AdsPage() {
    const { status, type, sort, setStatus, setType, setSort } = useAdsParams();

    const filteredAds = useMemo(() => {
        let result = [...MOCK_ADS];

        if (status) {
            result = result.filter(ad => ad.approvalState === status);
        }

        if (type) {
            result = result.filter(ad => ad.adType === type);
        }

        const [sortField, sortOrder] = sort.split(",");
        if (sortField === "purchaseDate") {
            result.sort((a, b) => {
                const dateA = new Date(a.purchaseDate).getTime();
                const dateB = new Date(b.purchaseDate).getTime();
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
        }

        return result;
    }, [status, type, sort]);

    return (
        <div className="w-full">
            <SiteHeader
                title="My Campaigns"
                description="Manage your ad campaigns"
            />
            <div className="w-full px-4 lg:px-6 py-4 md:gap-6 md:py-6 ">
                <AdsTable
                    ads={filteredAds}
                    status={status}
                    type={type}
                    sort={sort}
                    onStatusChange={setStatus}
                    onTypeChange={setType}
                    onSortChange={setSort}
                />
            </div>
        </div>
    );
}