import { baseApi } from "./baseApi";

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
