import { MessageMutation } from './types';
import { Container, Typography } from '@mui/material';
import Form from './components/Form/Form';

const App = () => {
  const onSubmit = async (messageData: MessageMutation) => {
    console.log(messageData);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{mb: 2}}>New Message</Typography>
        <Form onSubmit={onSubmit} isLoading={false}/>
      </Container>
    </>
  );
};

export default App;