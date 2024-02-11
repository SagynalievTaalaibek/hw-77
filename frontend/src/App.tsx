import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import Form from './components/Form/Form';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectCreateMessageLoading, selectFetchMessageLoading, selectMessages } from './store/message/messageSlice';
import { createMessage, fetchMessages } from './store/message/messageThunks';
import { MessageMutation } from './types';
import { useEffect } from 'react';
import { apiUrl } from './constants';

const App = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const createMessageLoading = useAppSelector(selectCreateMessageLoading);
  const fetchMessageLoading = useAppSelector(selectFetchMessageLoading);

  const onSubmit = async (messageData: MessageMutation) => {
    try {
      await dispatch(createMessage(messageData)).unwrap();
      await dispatch(fetchMessages()).unwrap();
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{mb: 2}}>New Message</Typography>
        <Form onSubmit={onSubmit} isLoading={createMessageLoading}/>
        <Grid container spacing={2}>
          {fetchMessageLoading ? <CircularProgress/> : messages.map((message) => (
            <Grid item xs={4} key={message.id}>
              <Card sx={{height: '100%'}}>
                <CardHeader title={message.author === '' ? 'Anonymous' : message.author}/>
                {message.image !== null ? <ImageCardMedia image={apiUrl + '/' + message.image}/> : ''}
                <CardContent>
                  {message.message}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default App;