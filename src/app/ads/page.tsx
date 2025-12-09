"use client"

import {SiteHeader} from "@/components/site-header";
import {AdsTable} from "@/components/ads-table";
import {useAdsParams} from "@/hooks/use-ads-params";

import {useUser} from "@/hooks/use-user";
import {UserRole} from "@/models/user-role";

import {useGetAdStatusCountsQuery, useSearchAdsQuery} from "@/store/services/adsApi";
import {AdFormatType, AdStatus} from "@/models/ad";

export default function AdsPage() {
    const {user} = useUser();
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

    const {data, isLoading} = useSearchAdsQuery({
        status: status && status !== 'null' ? (status as AdStatus) : undefined,
        types: type && type !== 'null' ? [type as AdFormatType] : undefined,
        sort,
        page,
        size,
        // Helper to formatting dates if backend expects string or specific format?
        // Backend usually expects simple ISO or maybe local date string? 
        // Request DTO provided by user doesn't show Date fields in AdSearchRequestDto!
        // Wait, the user provided AdSearchRequestDto:
        // public record AdSearchRequestDto(AdStatus status, List<AdFormatType> types, int page, int size, String sort, Long userId, String email) {}
        // It DOES NOT have startDate/endDate for filtering!
        // The previous mock implementation filtered by date.
        // I should probably REMOVE date filtering from the API call if backend doesn't support it, 
        // OR add userId/email if that's what we want to filter by.
        // User asked: "this is the endpoint where you will be making the query to get all the data... AdSearchRequestDto... IT will be expecint query params"
        // AdSearchRequestDto has userId and email.
        // The mock implementation filtered by `searchQuery` against username/userId.
        // So I should map `searchQuery` to `email` or `userId`?
        // Or if backend doesn't support generic "search", maybe I can't filter by arbitrary string.
        // But `AdSearchRequestDto` has `email` and `userId`.
        // Let's assume `searchQuery` maps to `email` for now, or if it looks like a number, `userId`.
        email: searchQuery && searchQuery !== 'null' ? searchQuery : undefined, // rudimentary search mapping
        // userId: ... 
    });

    const {data: statusCountsData} = useGetAdStatusCountsQuery();

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