import {
  API_DATA_ACTION,
  ApiDataContext,
  ApiDataDispatchContext,
  Board,
  User,
} from '@/context/api-data.provider';
import { AuthContext } from '@/context/auth.provider';
import { apiAxios } from '@/util/instances';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function BoardDetail() {
  const params = useParams();
  const apiData = useContext(ApiDataContext);
  const apiDataDispatch = useContext(ApiDataDispatchContext);
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const locate = useLocation();

  useEffect(() => {
    const id = params.id || NaN;
    const board = apiData.board.find((board) => board.id === +id);
    if (board) {
      const user = apiData.user.find((user) => user.id === board.author);
      setBoard(board);
      setUser(user);
    }
  }, [apiData]);

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  const handleUpdateBoard = () => {
    if (board && user) {
      navigate('/board/write', {
        state: { mode: 'update', board, user, referer: locate.pathname },
      });
    }
  };
  const handleDeleteBoard = async () => {
    if (board) {
      if (confirm('게시글을 삭제합니다.')) {
        const { data } = await apiAxios.delete(`/board/${board.id}`);
        if (data.ok === true) {
          apiDataDispatch({
            type: API_DATA_ACTION.UPDATE_VER,
          });
          alert('게시글이 삭제되었습니다.');
          handleRedirect('../');
        }
      }
    }
    return false;
  };

  return (
    <Stack>
      {board && user ? (
        <>
          <Toolbar />
          <Typography fontWeight={700} fontSize={20} gutterBottom>
            {board.id}. {board.title}
          </Typography>
          <Stack
            direction="row"
            gap={1}
            alignItems={'center'}
            justifyContent={'centere'}
            sx={{
              mb: 1,
            }}
          >
            <Avatar
              title={user.username}
              alt={'user name'}
              children={user.username.at(0)?.toUpperCase()}
              sx={{
                width: 32,
                height: 32,
              }}
            />
            <Typography fontWeight={700} fontSize={12} color="#969696">
              {user.username}
            </Typography>
          </Stack>
          <Divider />
          <Typography fontWeight={100} component="div">
            <Toolbar />
            {board.content.repeat(50)}
            <Toolbar />
          </Typography>
          <Divider />
          <Box sx={{ p: 1 }}>
            <Typography fontWeight={700} fontSize={12}>
              {new Date(board.created_at).toLocaleString('ko')}
            </Typography>
          </Box>
          <Stack direction="row" gap={1}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleRedirect('/board')}
            >
              back
            </Button>
            {auth.user && auth.user.id === board.author && (
              <>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleUpdateBoard}
                >
                  update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteBoard}
                >
                  delete
                </Button>
              </>
            )}
          </Stack>
        </>
      ) : (
        <Box>no board.</Box>
      )}

      <Toolbar />
    </Stack>
  );
}

export default BoardDetail;
