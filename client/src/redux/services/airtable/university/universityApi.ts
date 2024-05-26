// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UniversityData } from "./types";
import { AirTableResponse } from "../types";

// Define a service using a base URL and expected endpoints
export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  keepUnusedDataFor: Infinity,
  endpoints: builder => ({
    getUniversityList: builder.query<UniversityData, void>({
      keepUnusedDataFor: Infinity,
      query: () => ({
        url: "/university",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      }),
      transformResponse: (response: AirTableResponse): UniversityData => {
        const transformed = {
          offset: response.offset,
          universityList: response.records.map((record: any) => ({
            id: record.fields.id,
            name: record.fields.name,
            type: record.fields.type,
            image: record.fields.image ? record.fields.image[0].thumbnails.full.url : record.fields.name,
          })),
        };
        return transformed;
      },
    }),
  }),
});

export const { useGetUniversityListQuery, endpoints, reducerPath, reducer, middleware } = universityApi;
