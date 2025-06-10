import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './channelsSlice'
import messagesReducer from './messagesSlice'
import currentChannelReducer from './currentChannelSlice'
import modalsReducer from './modalsSlice'
import { channelsApi } from './channelsApi'
import { messagesApi } from './messagesApi'

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannel: currentChannelReducer,
    modals: modalsReducer,
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
})

export default store
