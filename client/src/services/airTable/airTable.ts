// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AirTableQueryBody, UniversityCourseModel } from "./types";

// Define a service using a base URL and expected endpoints
export const airTableApi = createApi({
  reducerPath: "airTableApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  endpoints: builder => ({
    getCourseList: builder.mutation<UniversityCourseModel[], AirTableQueryBody>({
      query: queryBody => ({
        url: "/major/listRecords",
        method: "POST",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(queryBody),
      }),
      transformResponse: (response: any): UniversityCourseModel[] => {
        const transformed = response.records.map((record: any) => ({
          name: record.fields.name,
          studyMode: record.fields.study_mode,
          fullCost: record.fields.full_cost,
          duration: record.fields.duration,
        }));
        return transformed;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCourseListMutation } = airTableApi;
