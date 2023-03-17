import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
require('dotenv').config();

const exchangesApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_EXCHANGES_RAPIDAPI_HOST,
};

export const exchangesApi = createApi({
    reducerPath: 'exchangesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_EXCHANGES_API_URL,

        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', exchangesApiHeaders['X-RapidAPI-Key']);
            headers.set('X-RapidAPI-Host', exchangesApiHeaders['X-RapidAPI-Host']);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: () => ({
                url: `/exchanges`,
                headers: exchangesApiHeaders
            }),
        }),    
    })
});

export const { useGetExchangesQuery } = exchangesApi;
