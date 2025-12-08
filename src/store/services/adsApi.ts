import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';
import {CreateAdRequest} from '@/utils/pricing-utils';

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
    }),
});

// Export hooks for usage in functional components
export const {
    useCreateAdMutation,
} = adsApi;
