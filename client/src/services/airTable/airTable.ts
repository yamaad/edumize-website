// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AirTableQueryBody, AirTableResponse, FilterOptionsData, UniversityCourseData, UniversityData } from "./types";

// Define a service using a base URL and expected endpoints
export const airTableApi = createApi({
  reducerPath: "airTableApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  endpoints: builder => ({
    getCourseList: builder.mutation<UniversityCourseData, AirTableQueryBody>({
      query: queryBody => ({
        url: "/major/listRecords",
        method: "POST",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(queryBody),
      }),
      transformResponse: (response: AirTableResponse): UniversityCourseData => {
        const transformed = {
          offset: response.offset,
          courseList: response.records.map((record: any) => ({
            name: record.fields.name,
            studyMode: record.fields.study_mode,
            fullCost: record.fields.full_cost,
            duration: record.fields.duration,
          })),
        };
        return transformed;
      },
    }),
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
    getUniversityList: builder.mutation<UniversityData, AirTableQueryBody>({
      query: queryBody => ({
        url: "/university/listRecords",
        method: "POST",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(queryBody),
      }),
      transformResponse: (response: AirTableResponse): UniversityData => {
        const transformed = {
          offset: response.offset,
          universityList: response.records.map((record: any) => ({
            type: record.fields.type,
            image: record.fields.image,
          })),
        };
        return transformed;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCourseListMutation, useGetFilterOptionListMutation, useGetUniversityListMutation } = airTableApi;
