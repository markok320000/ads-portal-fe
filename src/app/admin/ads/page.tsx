"use client"

import { SiteHeader } from "@/components/site-header";
import { AdsTable } from "@/components/ads-table";
import { useAdsParams } from "@/hooks/use-ads-params";
import { useUser } from "@/hooks/use-user";
import { UserRole } from "@/models/user-role";

import { useGetAdStatusCountsQuery, useSearchAdsQuery } from "@/store/services/adminAdsApi";
import { AdFormatType, AdStatus } from "@/models/ad";

export default function AdminAdsPage() {
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

    const { data } = useSearchAdsQuery({
        status: status && status !== 'null' ? (status as AdStatus) : undefined,
        types: type && type !== 'null' ? [type as AdFormatType] : undefined,
        sort,
        page,
        size,
        approvedAtStart: startDate ? startDate.toISOString() : undefined,
        approvedAtEnd: endDate ? endDate.toISOString() : undefined,
        email: searchQuery && searchQuery !== 'null' ? searchQuery : undefined,
    });

    const { data: statusCountsData } = useGetAdStatusCountsQuery();

    // Calculate counts from status counts API
    const counts = {
        all: data?.totalElements || 0,
        active: statusCountsData?.find(sc => sc.status === AdStatus.ACTIVE)?.count || 0,
        submitted: statusCountsData?.find(sc => sc.status === AdStatus.SUBMITTED)?.count || 0,
        completed: statusCountsData?.find(sc => sc.status === AdStatus.COMPLETED)?.count || 0,
        rejected: statusCountsData?.find(sc => sc.status === AdStatus.REJECTED)?.count || 0,
    };

    return (
        <div className="w-full">
            <SiteHeader
                title="Ads Management"
                description="Manage and review all platform advertisements"
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
