import { apiSlice } from './apiSlice';
const USERS_URL = 'http://localhost:5000/api/v1/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ headers, body }) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        headers,
        body,
      }),
    }),
   

    getProfil: builder.mutation({
      query: ({ token }) => ({
        url: `${USERS_URL}/profile`,
        method: 'POST',
        headers: { Authorization: token }
        
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetProfilMutation,
} = userApiSlice;
