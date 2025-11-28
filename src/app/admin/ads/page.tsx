"use client"

import {SiteHeader} from "@/components/site-header";
import {AdsTable} from "@/components/ads-table";
import {useAdsParams} from "@/hooks/use-ads-params";
import {useMemo} from "react";
import {useUser} from "@/hooks/use-user";
import {UserRole} from "@/models/user-role";

import {MOCK_ADS} from "@/data/mock-ads";

export default function AdminAdsPage() {
    const {user} = useUser();
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

        // Status filter
        if (status) {
            const filterStatus = status === 'active' ? 'active' : status;
            result = result.filter(ad => ad.approvalState === filterStatus);
        }

        // Type filter
        if (type) {
            result = result.filter(ad => ad.adType === type);
        }

        // Admin filters
        if (startDate) {
            result = result.filter(ad => {
                const adStartDate = new Date(ad.startDate);
                return adStartDate >= startDate;
            });
        }

        if (endDate) {
            result = result.filter(ad => {
                const adStartDate = new Date(ad.startDate);
                return adStartDate <= endDate;
            });
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(ad =>
                // Username is treated as email for filtering
                ad.username.toLowerCase().includes(query) ||
                ad.userId.toLowerCase().includes(query)
            );
        }

        // Sort
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
                title="Ads Management"
                description="Manage and review all platform advertisements"
            />
            <div className="w-full px-4 lg:px-6 py-4 md:gap-6 md:py-6 ">
                <AdsTable
                    ads={filteredAds}
                    status={status === 'active' ? 'active' : status}
                    type={type}
                    sort={sort}
                    onStatusChange={setStatus}
                    onTypeChange={setType}
                    onSortChange={setSort}
                    onClearFilters={clearParams}
                    isAdmin={user.role === UserRole.ADMIN}
                    startDate={startDate}
                    endDate={endDate}
                    searchQuery={searchQuery}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onSearchQueryChange={setSearchQuery}
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
