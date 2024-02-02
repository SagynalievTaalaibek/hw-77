import { Container, Typography } from '@mui/material';
import Form from './components/Form/Form';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectCreateMessageLoading } from './store/message/messageSlice';
import { createMessage } from './store/message/messageThunks';
import { MessageMutation } from './types';

const App = () => {
  const dispatch = useAppDispatch();
  const createMessageLoading = useAppSelector(selectCreateMessageLoading);

  const onSubmit = async (messageData: MessageMutation) => {
    await dispatch(createMessage(messageData));
    console.log(messageData);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{mb: 2}}>New Message</Typography>
        <Form onSubmit={onSubmit} isLoading={createMessageLoading}/>
      </Container>
    </>
  );
};

export default App;