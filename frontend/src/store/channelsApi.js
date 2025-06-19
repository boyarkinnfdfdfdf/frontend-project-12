import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
    }),
    createChannel: builder.mutation({
      query: (data) => ({
        url: '/channels',
        method: 'POST',
        body: data,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useCreateChannelMutation,
  useDeleteChannelMutation,
  useRenameChannelMutation,
} = channelsApi;
