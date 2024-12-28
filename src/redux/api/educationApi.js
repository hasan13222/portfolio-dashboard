import { baseApi } from "./baseApi";

const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEducation: builder.query({
      query: () => ({
        url: "/api/education",
        method: "GET",
      }),
      providesTags: ["education"],
    }),    
    createEducation: builder.mutation({
      query: (payload) => ({
        url: `/api/education`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["education"]
    }),  
    updateEducation: builder.mutation({
      query: (payload) => ({
        url: `/api/education/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: ["education"]
    }),  
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/api/education/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["education"]
    }),  
  }),
});

export const { useGetEducationQuery, useCreateEducationMutation, useUpdateEducationMutation, useDeleteEducationMutation} = educationApi;
