import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChannelId: null,
}

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload
    },
  },
})

export const { setCurrentChannel } = currentChannelSlice.actions
export default currentChannelSlice.reducer

export const selectCurrentChannelId = (state) => state.currentChannel.currentChannelId
