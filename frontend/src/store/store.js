import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import currentChannelReducer from './currentChannelSlice';
import modalsReducer from './modalsSlice';
import authReducer from './authSlice';
import { channelsApi } from './channelsApi';
import { messagesApi } from './messagesApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    currentChannel: currentChannelReducer,
    modals: modalsReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
});

export default store;
