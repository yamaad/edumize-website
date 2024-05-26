import { BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { AirTableQueryBody, AirTableResponse } from "../types";
import { airTableBase } from "../base";

export interface FilterOptionsData {
  filterOptions: string[];
  offset?: string;
}
export interface CourseModel {
  name: string;
  studyMode?: string;
  fullCost: number;
  duration: string;
}
export interface CourseData {
  courseList: CourseModel[];
  offset?: string;
}

const courseEndpoints = (
  builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "airTableApi">
) => ({
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
});

export const courseApi = airTableBase.injectEndpoints({ endpoints: courseEndpoints });
export const { useGetCourseListMutation, useGetFilterOptionListMutation } = courseApi;
