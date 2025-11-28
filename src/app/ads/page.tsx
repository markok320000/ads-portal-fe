"use client"

import { SiteHeader } from "@/components/site-header";
import { AdsTable } from "@/components/ads-table";
import { useAdsParams } from "@/hooks/use-ads-params";
import { useMemo } from "react";
import { useUser } from "@/hooks/use-user";
import { UserRole } from "@/models/user-role";

import { MOCK_ADS } from "@/data/mock-ads";

export default function AdsPage() {
    const { user } = useUser();
    const {
        status,
        type,
        sort,
        startDate,
        endDate,
        searchQuery,
        setStatus,
        setType,
        setSort,
        setStartDate,
        setEndDate,
        setSearchQuery,
        clearParams
    } = useAdsParams();

    const filteredAds = useMemo(() => {
        let result = [...MOCK_ADS];

        if (status) {
            const filterStatus = status === 'active' ? 'active' : status;
            result = result.filter(ad => ad.approvalState === filterStatus);
        }

        if (type) {
            result = result.filter(ad => ad.adType === type);
        }

        if (startDate) {
            result = result.filter(ad => new Date(ad.purchaseDate) >= startDate);
        }

        if (endDate) {
            // Set end date to end of day for inclusive filtering
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            result = result.filter(ad => new Date(ad.purchaseDate) <= endOfDay);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(ad =>
                (ad.username && ad.username.toLowerCase().includes(query)) ||
                (ad.userId && ad.userId.toLowerCase().includes(query))
            );
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
    }, [status, type, sort, startDate, endDate, searchQuery]);

    return (
        <div className="w-full">
            <SiteHeader
                title="My Campaigns"
                description="Manage your ad campaigns"
            />
            <div className="w-full px-4 lg:px-6 py-4 md:gap-6 md:py-6 ">
                <AdsTable
                    ads={filteredAds}
                    status={status === 'active' ? 'active' : status}
                    type={type}
                    sort={sort}
                    startDate={startDate}
                    endDate={endDate}
                    searchQuery={searchQuery}
                    onStatusChange={setStatus}
                    onTypeChange={setType}
                    onSortChange={setSort}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onSearchQueryChange={setSearchQuery}
                    onClearFilters={clearParams}
                    isAdmin={user.role === UserRole.ADMIN}
                    counts={{
                        all: MOCK_ADS.length,
                        active: MOCK_ADS.filter(ad => ad.approvalState === "active").length,
                        submitted: MOCK_ADS.filter(ad => ad.approvalState === "submitted").length,
                        completed: MOCK_ADS.filter(ad => ad.approvalState === "completed").length,
                        rejected: MOCK_ADS.filter(ad => ad.approvalState === "rejected").length,
                    }}
                />
            </div>
        </div>
    );
}