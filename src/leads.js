import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const StaffApi = createApi({
  reducerPath: 'staffapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6788/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    signup: build.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const{ useSignupMutation}=StaffApi