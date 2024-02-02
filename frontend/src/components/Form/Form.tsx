import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '../FileInput/FileInput';
import { MessageMutation } from '../../types';

interface Props {
  onSubmit: (messageMutation: MessageMutation) => void;
  isLoading: boolean;
}

const Form: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<MessageMutation>({
    message: '',
    author: '',
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({
      message: '',
      author: '',
      image: null,
    })
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': {width: '45ch', mb: 1},
      }}
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <div>
        <TextField
          id="author" label="Author"
          name="author"
          value={state.author}
          onChange={inputChangeHandler}
        />
      </div>
      <div>
        <TextField
          required
          multiline rows={3}
          id="message" label="Message"
          name="message"
          value={state.message}
          onChange={inputChangeHandler}
        />
      </div>
      <div style={{maxWidth: '600px'}}>
        <FileInput
          onChange={fileInputChangeHandler}
          name="image"
          label="Message Image"
        />
      </div>
      <LoadingButton
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<SaveIcon/>}
      >
        Send
      </LoadingButton>
    </Box>
  );
};

export default Form;