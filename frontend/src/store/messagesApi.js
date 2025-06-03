import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useAuth } from '../AuthContext.jsx'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const state = getState && getState()
      return headers
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: ({ channelId }) => `/channels/${channelId}/messages`,
      providesTags: (result, error, arg) => [
        { type: 'Messages', id: arg.channelId },
      ],
    }),
    sendMessage: builder.mutation({
      query: ({ body, channelId, username, token }) => ({
        url: `/messages`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { body, channelId, username },
      }),
      invalidatesTags: (result, error, { channelId }) => [
        { type: 'Messages', id: channelId },
      ],
    }),
  }),
})

export const { useFetchMessagesQuery, useSendMessageMutation } = messagesApi
