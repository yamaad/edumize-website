// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Currencies, Rates } from "./types";
// Define a service using a base URL and expected endpoints
export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_EDUMIZE_SERVER}/api/currency` }),
  keepUnusedDataFor: Infinity,
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  endpoints: builder => ({
    getCurrency: builder.query<Currencies, void>({
      query: () => "",
      transformResponse: (response: Currencies): Currencies => {
        console.log(response);
        return response;
      },
    }),
    getCurrencyRate: builder.query<Rates, void>({
      query: () => "/rate",
      transformResponse: (response: Rates): Rates => {
        console.log(response);
        return response;
      },
    }),
  }),
});

export const { useGetCurrencyQuery, useGetCurrencyRateQuery } = currencyApi;
