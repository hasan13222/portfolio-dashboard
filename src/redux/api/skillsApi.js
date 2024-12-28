import { baseApi } from "./baseApi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({
        url: "/api/skills",
        method: "GET",
      }),
      providesTags: ["skills"],
    }),    
    createSkills: builder.mutation({
      query: (payload) => ({
        url: `/api/skills`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["skills"]
    }),  
    updateSkills: builder.mutation({
      query: (payload) => ({
        url: `/api/skills/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: ["skills"]
    }),  
    deleteSkills: builder.mutation({
      query: (id) => ({
        url: `/api/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skills"]
    }),  
  }),
});

export const { useGetSkillsQuery, useCreateSkillsMutation, useUpdateSkillsMutation, useDeleteSkillsMutation} = skillsApi;
