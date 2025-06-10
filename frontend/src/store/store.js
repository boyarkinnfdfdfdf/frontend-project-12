import { configureStore } from '@reduxjs/toolkit'
import channelsReducer from './channelsSlice'
import messagesReducer from './messagesSlice'
import currentChannelReducer from './currentChannelSlice'
import modalsReducer from './modalsSlice'
import { channelsApi } from './channelsApi'
import { messagesApi } from './messagesApi'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannel: currentChannelReducer,
    modals: modalsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
})

export default store
