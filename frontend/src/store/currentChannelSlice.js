import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: null,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const selectCurrentChannelId = (state) => state.currentChannel.currentChannelId;
export const { setCurrentChannelId } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;//
