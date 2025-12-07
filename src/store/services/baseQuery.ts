import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as { auth: { token: string | null } }).auth.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});
