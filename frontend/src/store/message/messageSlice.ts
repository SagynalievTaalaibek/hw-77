import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createMessage, fetchMessages } from './messageThunks';
import { Message } from '../../types';

interface MessageState {
  messages: Message[];
  createMessageLoading: boolean;
  fetchMessageLoading: boolean;
}

const initialState: MessageState = {
  messages: [],
  createMessageLoading: false,
  fetchMessageLoading: false,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMessage.pending, state => {
      state.createMessageLoading = true;
    });
    builder.addCase(createMessage.fulfilled, (state) => {
      state.createMessageLoading = false;
    });
    builder.addCase(createMessage.rejected, state => {
      state.createMessageLoading = false;
    });
    builder.addCase(fetchMessages.pending, state => {
      state.fetchMessageLoading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, {payload: messages}) => {
      state.fetchMessageLoading = false;
      state.messages = messages;
    });
    builder.addCase(fetchMessages.rejected, state => {
      state.fetchMessageLoading = false;
    });
  },
});

export const messageReducer = messageSlice.reducer;

export const selectMessages = (state: RootState) => state.message.messages;
export const selectFetchMessageLoading = (state: RootState) => state.message.fetchMessageLoading;
export const selectCreateMessageLoading = (state: RootState) => state.message.createMessageLoading;