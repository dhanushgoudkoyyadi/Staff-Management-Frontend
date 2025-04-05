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
    }),
    addsalary: build.mutation({
      query: (data) => ({
        url: '/salary',
        method: 'POST',
        body: data
      })
    }),
    getSalary: build.mutation({
      query: (data) => ({
        url: '/register',
        method: 'GET',
        body: data
      })
    })

  })
  
});

export const{ useSignupMutation,
  useAddsalaryMutation
}=StaffApi