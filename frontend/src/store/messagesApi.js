import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const selectAuthToken = (state) => state.auth?.token ?? '';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAuthToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchMessages: build.query({
      query: ({ channelId }) => `/channels/${channelId}/messages`,
    }),
    addMessage: build.mutation({
      query: ({ channelId, ...body }) => ({
        url: `/channels/${channelId}/messages`,
        method: 'POST',
        body,
      }),
    }),
    removeMessage: build.mutation({
      query: ({ id, channelId }) => ({
        url: `/channels/${channelId}/messages/${id}`,
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
