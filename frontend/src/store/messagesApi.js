import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const selectAuthToken = (state) => state.auth?.user?.token

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = selectAuthToken(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: (params) => {
        return params?.channelId
          ? `?channelId=${params.channelId}`
          : ''
      },
      providesTags: (result, error, arg) => {
        if (arg?.channelId) {
          return [{ type: 'Messages', id: arg.channelId }]
        }
        return [{ type: 'Messages' }]
      },
    }),
    sendMessage: builder.mutation({
      query: ({ body, channelId, username }) => ({
        url: '',
        method: 'POST',
        body: { body, channelId, username },
      }),
      invalidatesTags: (result, error, { channelId }) => [
        { type: 'Messages', id: channelId },
      ],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Messages' }],
    }),
  }),
})

export const {
  useFetchMessagesQuery,
  useSendMessageMutation,
  useRemoveMessageMutation,
} = messagesApi
