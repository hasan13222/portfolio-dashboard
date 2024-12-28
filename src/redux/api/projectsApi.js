import { baseApi } from "./baseApi";

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/api/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),    
    createProjects: builder.mutation({
      query: (payload) => ({
        url: `/api/projects`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["projects"]
    }),  
    updateProjects: builder.mutation({
      query: (payload) => ({
        url: `/api/projects/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: ["projects"]
    }),  
    deleteProjects: builder.mutation({
      query: (id) => ({
        url: `/api/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"]
    }),  
  }),
});

export const { useGetProjectsQuery, useCreateProjectsMutation, useUpdateProjectsMutation, useDeleteProjectsMutation} = projectsApi;
