import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './channelsSlice'
import messagesReducer from './messagesSlice'
import { messagesApi } from './messagesApi'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware),
})

export default store
