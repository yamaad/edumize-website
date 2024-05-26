// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CourseData } from "./types";
import { AirTableQueryBody, AirTableResponse } from "../types";

// Define a service using a base URL and expected endpoints
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  keepUnusedDataFor: Infinity,
  endpoints: builder => ({
    getCourseList: builder.mutation<CourseData, AirTableQueryBody>({
      query: queryBody => ({
        url: "/major/listRecords",
        method: "POST",
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(queryBody),
      }),
      transformResponse: (response: AirTableResponse): CourseData => {
        const transformed = {
          offset: response.offset,
          courseList: response.records.map((record: any) => ({
            name: record.fields.name,
            studyMode: record.fields.study_mode,
            fullCost: record.fields.full_cost,
            duration: record.fields.duration,
            universityId: Number(record.fields.uni_id),
          })),
        };
        return transformed;
      },
    }),
  }),
});

export const { useGetCourseListMutation, endpoints, reducerPath, reducer, middleware } = courseApi;
