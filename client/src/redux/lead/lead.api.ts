// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LeadModel, validateEmailBody } from "./lead.model";
// Define a service using a base URL and expected endpoints
export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_EDUMIZE_SERVER}/api/lead` }),
  tagTypes: ["Lead"],
  endpoints: builder => ({
    validateEmail: builder.mutation<LeadModel, validateEmailBody>({
      query: body => ({
        url: "/validate-email",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      transformResponse: (response: LeadModel): LeadModel => {
        return response;
      },
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const { useValidateEmailMutation } = leadApi;
