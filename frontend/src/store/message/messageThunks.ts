import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { MessageMutation } from '../../types';

export const createMessage = createAsyncThunk<void, MessageMutation>(
  'message/create',
  async (newMessage) => {
    const formData = new FormData();
    formData.append('message', newMessage.message);
    formData.append('author', newMessage.author);

    if (newMessage.image) {
      formData.append('image', newMessage.image);
    }

    await axiosApi.post('/message', formData);
  }
);