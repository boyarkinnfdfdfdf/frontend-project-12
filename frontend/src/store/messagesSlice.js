import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessage: (state, { payload }) => {
      state.messages = state.messages.filter((msg) => msg.id !== payload);
    },
  },
});

export const selectCurrentChannelMessages = [
  (state) => state.messages.messages,
  (state) => state.currentChannel.currentChannelId,
  (messages, currentChannelId) =>
    messages.filter((msg) => msg.channelId === currentChannelId),
];

export const { addMessages, addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
