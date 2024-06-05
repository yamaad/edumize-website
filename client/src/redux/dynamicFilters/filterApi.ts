// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AirTableQueryBody, AirTableResponse } from "../course/airtable.model";
import { FilterOptionsData } from "./types";

// Define a service using a base URL and expected endpoints
export const filterApi = createApi({
  reducerPath: "filterApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  keepUnusedDataFor: Infinity,
  endpoints: builder => ({
    getFilterOptionList: builder.mutation<FilterOptionsData, AirTableQueryBody>({
      query: queryBody => ({
        url: "/major/listRecords",
        method: "POST",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(queryBody),
      }),
      transformResponse: (response: AirTableResponse, _, queryBody): FilterOptionsData => {
        const transformed = new Set(
          response.records.map((record: any) =>
            record.fields[`${queryBody.fields[0]}`] ? record.fields[`${queryBody.fields[0]}`].toLowerCase().trim() : ""
          )
        );
        return { filterOptions: [...transformed], offset: response.offset };
      },
    }),
  }),
});

export const { useGetFilterOptionListMutation, endpoints, reducerPath, reducer, middleware } = filterApi;
