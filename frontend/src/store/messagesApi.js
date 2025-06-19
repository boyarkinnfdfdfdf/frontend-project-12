import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (channelId) => ({
        url: `/channels/${channelId}/messages`,
        method: 'GET',
      }),
    }),
    addMessage: builder.mutation({
      query: ({ channelId, ...data }) => ({
        url: `/channels/${channelId}/messages`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteMessage: builder.mutation({
      query: ({ channelId, id }) => ({
        url: `/channels/${channelId}/messages/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
