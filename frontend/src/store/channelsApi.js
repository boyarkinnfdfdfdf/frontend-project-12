import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const selectAuthToken = (state) => (state.auth?.token ?? '');

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAuthToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
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
