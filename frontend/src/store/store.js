import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import currentChannelReducer from './currentChannelSlice';
import modalsReducer from './modalsSlice';
import { channelsApi } from './channelsApi';
import { messagesApi } from './messagesApi';
import authReducer from './authSlice';
import { messagesReducer } from './messagesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
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
