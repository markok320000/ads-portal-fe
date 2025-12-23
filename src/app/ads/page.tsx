"use client"

import { SiteHeader } from "@/components/site-header";
import { AdsTable } from "@/components/ads-table";
import { useAdsParams } from "@/hooks/use-ads-params";

import { useUser } from "@/hooks/use-user";
import { UserRole } from "@/models/user-role";

import { useGetAdStatusCountsByUserQuery, useSearchAdsQuery } from "@/store/services/adsApi";
import { AdFormatType, AdStatus } from "@/models/ad";

export default function AdsPage() {
    const { user } = useUser();
    const {
        status,
        type,
        sort,
        page,
        size,
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

    // For regular users, enforce userId to match authenticated user
    const { data } = useSearchAdsQuery({
        status: status && status !== 'null' ? (status as AdStatus) : undefined,
        types: type && type !== 'null' ? [type as AdFormatType] : undefined,
        sort,
        page,
        size,
        // For regular users, always include their userId (backend enforces this)
        userId: user.role === UserRole.USER ? parseInt(user.id) : undefined,
        // Admin can optionally filter by email using search query
        email: searchQuery && searchQuery !== 'null' ? searchQuery : undefined,
    });

    // Use user-specific counts for regular users, all counts for admins
    const { data: statusCountsData } = useGetAdStatusCountsByUserQuery()

    // Calculate counts from status counts API
    const counts = {
        all: data?.totalElements || 0,
        active: statusCountsData?.find(sc => sc.status === AdStatus.ACTIVE)?.count || 0,
        submitted: statusCountsData?.find(sc => sc.status === AdStatus.SUBMITTED)?.count || 0,
        completed: statusCountsData?.find(sc => sc.status === AdStatus.COMPLETED)?.count || 0,
        rejected: statusCountsData?.find(sc => sc.status === AdStatus.REJECTED)?.count || 0,
    };

    // Note: Removed client-side filtering logic as it's now server-side.

    return (
        <div className="w-full">
            <SiteHeader
                title="My Campaigns"
                description="Manage your ad campaigns"
            />
            <div className="w-full px-4 lg:px-6 py-4 md:gap-6 md:py-6 ">
                <AdsTable
                    ads={data?.content || []}
                    status={status}
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
                    counts={counts}
                />
            </div>
        </div>
    );
}