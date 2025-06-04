import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const selectAuthToken = (state) => state.auth?.user?.token

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAuthToken(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => '',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Channels', id })),
              { type: 'Channels' },
            ]
          : [{ type: 'Channels' }],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '',
        method: 'POST',
        body: newChannel,
      }),
      invalidatesTags: [{ type: 'Channels' }],
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: `/${channelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, channelId) => [
        { type: 'Channels', id: channelId },
        { type: 'Channels' },
      ],
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Channels', id },
        { type: 'Channels' },
      ],
    }),
  }),
})

export const {
  useFetchChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi
