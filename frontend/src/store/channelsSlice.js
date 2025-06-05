import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.channels = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((ch) => ch.id !== payload);
    },
    updateChannel: (state, { payload }) => {
      const idx = state.channels.findIndex((ch) => ch.id === payload.id);
      if (idx !== -1) {
        state.channels[idx] = payload;
      }
    },
  },
});

export const selectChannels = (state) => state.channels.channels;
export const selectCurrentChannel = (state) => {
  const currentChannelId = state.currentChannel.currentChannelId;
  return state.channels.channels.find((ch) => ch.id === currentChannelId);
};

export const { addChannels, addChannel, removeChannel, updateChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
