import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: () => ({
        url: "/api/dashboard/summary",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),    
    createSummary: builder.mutation({
      query: (payload) => ({
        url: `/api/dashboard/summary`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["dashboard"]
    }),  
  }),
});

export const { useGetSummaryQuery, useCreateSummaryMutation} = dashboardApi;
