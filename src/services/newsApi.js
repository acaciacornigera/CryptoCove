import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

require('dotenv').config();

const newsApiHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
};

export const newsApi = createApi({
  reducerPath: 'newsApi ',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NEWS_API_URL,

    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', newsApiHeaders['X-RapidAPI-Key']);
      headers.set('X-RapidAPI-Host', newsApiHeaders['X-RapidAPI-Host']);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => ({ url: `/top/9`, headers: newsApiHeaders }),
    }),
  })
});

export const { useGetNewsQuery } = newsApi;
