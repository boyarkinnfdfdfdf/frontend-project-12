import { configureStore } from '@reduxjs/toolkit'
import modalsReducer from './modalsSlice'
import currentChannelReducer from './currentChannelSlice'
import channelsReducer from './channelsSlice'
import { channelsApi } from './channelsApi'
import { messagesApi } from './messagesApi'

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    currentChannel: currentChannelReducer,
    channels: channelsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware, messagesApi.middleware),
})

export default store
