import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Message, MessageMutation } from '../../types';


export const fetchMessages = createAsyncThunk<Message[]>(
  'messages/fetch',
  async () => {
    const response = await axiosApi.get('/message');
    const messages = response.data;

    if (!messages) {
      return [];
    }

    return messages;
  }
);


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

