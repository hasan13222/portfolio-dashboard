import { baseApi } from "./baseApi";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/api/about/personal-details",
        method: "GET",
      }),
      providesTags: ["about"],
    }),    
    createAbout: builder.mutation({
      query: (payload) => ({
        url: `/api/about/personal-details`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["about"]
    }),  
  }),
});

export const { useGetAboutQuery, useCreateAboutMutation} = aboutApi;
