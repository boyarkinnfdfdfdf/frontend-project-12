import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchMessages: build.query({
      query: (params) => (params?.channelId ? `?channelId=${params.channelId}` : ''),
    }),
    addMessage: build.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    removeMessage: build.mutation({
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
export const messagesReducer = messagesApi.reducer;
