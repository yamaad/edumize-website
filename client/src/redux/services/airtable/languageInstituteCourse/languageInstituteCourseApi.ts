// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AirTableResponse } from "../types";
import { InstituteCourseFeeModel, InstituteCourseModel, InstituteModel } from "redux/features/instituteSlice/instituteModel";

// Define a service using a base URL and expected endpoints
export const languageInstituteCourseApi = createApi({
  reducerPath: "languageInstituteCourseApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  keepUnusedDataFor: Infinity,
  endpoints: builder => ({
    getLanguageInstitute: builder.query<InstituteModel[], void>({
      keepUnusedDataFor: Infinity,
      query: () => ({
        url: `/language_institute`,
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      }),
      transformResponse: (response: AirTableResponse): InstituteModel[] => {
        return response.records.map(record => record.fields);
      },
    }),
    getLanguageInstituteCourseList: builder.query<InstituteCourseModel[], string>({
      keepUnusedDataFor: 0,
      query: (query: string) => ({
        url: `/language_course?${query}`,
        headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      }),
      transformResponse: (response: AirTableResponse): InstituteCourseModel[] => {
        return response.records.map((record: any) => record.fields);
      },
    }),
    getLanguageInstituteCourseFeeList: builder.query<InstituteCourseFeeModel[], string>({
      keepUnusedDataFor: 0,
      query: (query: string) => {
        return {
          url: `/language_course_fee?${query}`,
          headers: { "Authorization": `Bearer ${import.meta.env.VITE_AIR_TABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        };
      },
      transformResponse: (response: AirTableResponse): InstituteCourseFeeModel[] => {
        return response.records
          .map((record: any) => ({
            id: record.fields.id,
            duration: record.fields.duration,
            offer: record.fields.offer,
            originalFee: record.fields.original_tuition_fee,
            discountedFee: record.fields.discounted_tuition_fee,
            edumizeDiscountRate: record.fields.edumize_discount_rate,
            registrationFee: record.fields.registration_fees,
            placementTest: record.fields.placement_test,
            visaAndInsurance: record.fields.visa_and_medical_insurance,
            booksAndMaterials: record.fields.books_and_materials,
            immigrationClearanceAndAirportPickUp: record.fields.immigration_clearance_and_airport_pickup,
            instituteId: record.fields.institute_id,
            courseId: record.fields.course_id,
          }))
          .sort((a, b) => a.duration - b.duration);
      },
    }),
  }),
});

export const { useGetLanguageInstituteCourseFeeListQuery, useGetLanguageInstituteQuery, useGetLanguageInstituteCourseListQuery } =
  languageInstituteCourseApi;
