import {
  API_DATA_ACTION,
  ApiDataDispatchContext,
} from '@/context/api-data.provider';
import { apiAxios } from '@/util/instances';
import {
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WriteBoard() {
  const [formdata, setFormdata] = useState({});
  const formRef = useRef<HTMLFormElement>(null);
  const apiDataDispatch = useContext(ApiDataDispatchContext);
  const navigate = useNavigate();

  const sendRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      try {
        const response = await apiAxios.post('/board', {
          ...Object.fromEntries(formData.entries()),
          author: 5,
        });
        if (response.status === 201) {
          apiDataDispatch({
            type: API_DATA_ACTION.UPDATE_VER,
          });
          navigate('/board');
          console.log('✨ success!');
        } else {
          console.log(response.data);
          throw new Error(response.data);
        }
      } catch (error) {
        console.debug(error);
        console.log('❌ failed!');
        formRef.current.reset();
      }
    }
    return false;
  };

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const key = target.name;
    const value = target.value;
    setFormdata({
      ...formdata,
      [key]: value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography
        fontSize={(theme) => theme.typography.pxToRem(32)}
        fontWeight={700}
        gutterBottom
      >
        {'write board'.toUpperCase()}
      </Typography>
      <Stack
        component={'form'}
        gap={1}
        ref={formRef}
        onSubmit={(e: FormEvent) => sendRequest(e)}
      >
        <TextField
          size="small"
          name="title"
          label="title"
          onChange={handleData}
        />
        <TextField
          size="small"
          name="content"
          label="content"
          onChange={handleData}
        />
        <Divider />
        <Stack direction="row" gap={1}>
          <Button variant="contained" type="submit">
            confirm
          </Button>
          <Button variant="contained" color="error" type="button">
            cancel
          </Button>
        </Stack>
      </Stack>
      <Toolbar />
    </Container>
  );
}

export default WriteBoard;
