import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';
import {CreateAdRequest} from '@/utils/pricing-utils';
import {Ad, AdSearchRequest, AdStatusCount, PaginatedResponse} from '@/models/ad';

// Define the service using a base URL and expected endpoints
export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: baseQuery,
    tagTypes: ['Ads'],
    endpoints: (builder) => ({
        // Create Ad
        createAd: builder.mutation<void, CreateAdRequest>({
            query: (data) => ({
                url: '/ads',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Ads'],
        }),
        // Search Ads
        searchAds: builder.query<PaginatedResponse<Ad>, AdSearchRequest>({
            query: (params) => ({
                url: '/ads',
                method: 'GET',
                params: {
                    status: params.status,
                    types: params.types, // Arrays might need special handling depending on backend (e.g. types=A&types=B or types=A,B)
                    page: params.page,
                    size: params.size,
                    sort: params.sort,
                    userId: params.userId,
                    email: params.email
                },
            }),
            providesTags: ['Ads'],
        }),
        // Get Ad Status Counts By User (Regular users - their own ads only)
        getAdStatusCountsByUser: builder.query<AdStatusCount[], void>({
            query: () => ({
                url: '/ads/status-counts-by-user',
                method: 'GET',
            }),
            providesTags: ['Ads'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useCreateAdMutation,
    useSearchAdsQuery,
    useGetAdStatusCountsByUserQuery,
} = adsApi;
