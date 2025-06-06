import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const selectAuthToken = (state) => state.auth?.user?.token;

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAuthToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: (params) =>
        params?.channelId ? `?channelId=${params.channelId}` : '',
    }),
    addMessage: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
