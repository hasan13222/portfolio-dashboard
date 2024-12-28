import { baseApi } from "./baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperience: builder.query({
      query: () => ({
        url: "/api/experience",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),    
    createExperience: builder.mutation({
      query: (payload) => ({
        url: `/api/experience`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["experience"]
    }),  
    updateExperience: builder.mutation({
      query: (payload) => ({
        url: `/api/experience/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: ["experience"]
    }),  
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/api/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"]
    }),  
  }),
});

export const { useGetExperienceQuery, useCreateExperienceMutation, useUpdateExperienceMutation, useDeleteExperienceMutation} = experienceApi;
