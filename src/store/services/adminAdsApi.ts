import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';
import {Ad, AdSearchRequest, AdStatusCount, PaginatedResponse} from '@/models/ad';

// Admin-specific ads API service
export const adminAdsApi = createApi({
    reducerPath: 'adminAdsApi',
    baseQuery: baseQuery,
    tagTypes: ['AdminAds'],
    endpoints: (builder) => ({
        // Search Ads (Admin)
        searchAds: builder.query<PaginatedResponse<Ad>, AdSearchRequest>({
            query: (params) => ({
                url: '/admin/ads',
                method: 'GET',
                params: {
                    status: params.status,
                    types: params.types,
                    page: params.page,
                    size: params.size,
                    sort: params.sort,
                    userId: params.userId,
                    email: params.email,
                    approvedAtStart: params.approvedAtStart,
                    approvedAtEnd: params.approvedAtEnd,
                },
            }),
            providesTags: ['AdminAds'],
        }),
        // Get Ad Status Counts (Admin)
        getAdStatusCounts: builder.query<AdStatusCount[], void>({
            query: () => ({
                url: '/admin/ads/status-counts',
                method: 'GET',
            }),
            providesTags: ['AdminAds'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useSearchAdsQuery,
    useLazySearchAdsQuery,
    useGetAdStatusCountsQuery,
} = adminAdsApi;
