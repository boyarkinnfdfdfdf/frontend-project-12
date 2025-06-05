import axios from 'axios';
import { addChannels } from './channelsSlice';
import { addMessages } from './messagesSlice';

export const fetchData = () => async (dispatch) => {
  try {
    const [channelsRes, messagesRes] = await Promise.all([
      axios.get('/api/v1/channels'),
      axios.get('/api/v1/messages'),
    ]);
    dispatch(addChannels(channelsRes.data));
    dispatch(addMessages(messagesRes.data));
  } catch (e) {
  }
};
