// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AirTableResponse } from "../types";
import { UniversityTypeData } from "./types";
// Define a service using a base URL and expected endpoints
export const universityTypeApi = createApi({
  reducerPath: "universityTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  keepUnusedDataFor: Infinity,
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  endpoints: builder => ({
    getUniversityTypeList: builder.query<UniversityTypeData, void>({
      query: () => ({
        url: "/university_type_image",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      }),
      transformResponse: (response: AirTableResponse): UniversityTypeData => {
        const transformed = {
          offset: response.offset,
          universityTypeList: response.records.map((record: any) => ({
            type: record.fields.type,
            image: record.fields.image[0].thumbnails.full.url || record.fields.type,
          })),
        };
        return transformed;
      },
    }),
  }),
});

export const { useGetUniversityTypeListQuery } = universityTypeApi;
