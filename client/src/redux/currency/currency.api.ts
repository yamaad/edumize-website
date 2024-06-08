import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Currencies, Rates } from "./currency.model";
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
        const unwantedCurrency = ["BTC", "YER", "XPT", "XPF", "XPD", "XOF", "XDR", "XAU", "XAG", "SYP", "SSP", "SDP", "ILS", "LBP", "NGN"];
        unwantedCurrency.forEach(value => {
          if (value in response) delete response[value];
        });
        return response;
      },
    }),
    getCurrencyRate: builder.query<Rates, void>({
      query: () => "/rate",
      transformResponse: (response: Rates): Rates => {
        return response;
      },
    }),
  }),
});

export const { useGetCurrencyQuery, useGetCurrencyRateQuery } = currencyApi;
