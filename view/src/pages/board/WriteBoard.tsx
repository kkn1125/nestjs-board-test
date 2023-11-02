import {
  API_DATA_ACTION,
  ApiDataDispatchContext,
  Board,
  User,
} from '@/context/api-data.provider';
import { AuthContext } from '@/context/auth.provider';
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
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function WriteBoard() {
  const [formdata, setFormdata] = useState<{
    title?: string;
    content?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const auth = useContext(AuthContext);
  const apiDataDispatch = useContext(ApiDataDispatchContext);
  const navigate = useNavigate();
  const locate = useLocation();
  const writeMode = !locate.state ? 'write' : 'update';

  useEffect(() => {
    if (writeMode === 'update') {
      const state = locate.state;
      const title = state.board.title;
      const content = state.board.content;
      setFormdata((forms) => ({
        ...forms,
        title,
        content,
      }));
    }
  }, []);

  const sendPostRequest = async (formData: FormData, user: User) => {
    return await apiAxios.post('/board', {
      ...Object.fromEntries(formData.entries()),
      author: user.id,
    });
  };
  const sendPutRequest = async (
    formData: FormData,
    user: User,
    board: Board,
  ) => {
    return await apiAxios.put(
      `/board/${board.id}`,
      {
        ...Object.fromEntries(formData.entries()),
        author: user.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + auth.auth.token,
        },
      },
    );
  };

  const sendRequest = async (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const user = auth.user;
      const board = locate.state && locate.state.board;
      try {
        if (user) {
          const response = await (writeMode === 'write'
            ? sendPostRequest(formData, user)
            : sendPutRequest(formData, user, board));
          if (response.status === 201) {
            apiDataDispatch({
              type: API_DATA_ACTION.UPDATE_VER,
            });
            if (writeMode === 'write') {
              navigate('/board');
            } else {
              navigate(`/board/${board.id}`);
            }
            console.log('✨ success!');
          } else {
            console.log(response.data);
            throw new Error(response.data);
          }
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

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxWidth="sm">
      <Typography
        fontSize={(theme) => theme.typography.pxToRem(32)}
        fontWeight={700}
        gutterBottom
      >
        {`${writeMode} board`.toUpperCase()}
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
          value={formdata.title || ''}
        />
        <TextField
          size="small"
          name="content"
          label="content"
          onChange={handleData}
          value={formdata.content || ''}
        />
        <Divider />
        <Stack direction="row" gap={1}>
          <Button variant="contained" type="submit">
            {writeMode}
          </Button>
          <Button variant="contained" color="error" type="button">
            cancel
          </Button>
          {writeMode === 'update' && (
            <Button
              color="warning"
              onClick={() => handleRedirect(locate.state.referer)}
            >
              go to detail
            </Button>
          )}
        </Stack>
      </Stack>
      <Toolbar />
    </Container>
  );
}

export default WriteBoard;
