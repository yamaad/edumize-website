// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const airTableBase = createApi({
  reducerPath: "airTableApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_AIR_TABLE_URL }),
  endpoints: () => ({}),
});
