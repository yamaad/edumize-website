import { BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { AirTableQueryBody, AirTableResponse } from "../types";
import { airTableBase } from "../base";

export interface UniversityModel {
  type: string;
  image: string;
}
export interface UniversityData {
  universityList: UniversityModel[];
  offset?: string;
}

const universityEndpoints = (
  builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "airTableApi">
) => ({
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
});

export const courseApi = airTableBase.injectEndpoints({ endpoints: universityEndpoints });
export const { useGetUniversityListMutation } = courseApi;
