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
  endpoints: (build) => ({
    fetchChannels: build.query({
      query: () => '/channels',
    }),
    addChannel: build.mutation({
      query: (body) => ({
        url: '/channels',
        method: 'POST',
        body,
      }),
    }),
    removeChannel: build.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    }),
    renameChannel: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useFetchChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi;
