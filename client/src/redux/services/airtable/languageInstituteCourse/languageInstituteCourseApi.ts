// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { languageInstituteCourseData } from "./types";
import { AirTableResponse } from "../types";

// Define a service using a base URL and expected endpoints
export const languageInstituteCourseApi = createApi({
  reducerPath: "languageInstituteCourseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  keepUnusedDataFor: Infinity,
  endpoints: builder => ({
    getLanguageInstituteCourse: builder.query<languageInstituteCourseData, string>({
      keepUnusedDataFor: Infinity,
      query: (query: string) => ({
        url: `/language_course_fee?${query}`,
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      }),
      transformResponse: (response: AirTableResponse): languageInstituteCourseData => {
        const course = { course: response.records.map((record: any) => record.fields) };
        return course;
      },
    }),
  }),
});

export const { useGetLanguageInstituteCourseQuery } = languageInstituteCourseApi;
