import { ApiDataContext, Board, User } from '@/context/api-data.provider';
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
import { useNavigate, useParams } from 'react-router-dom';

function BoardDetail() {
  const params = useParams();
  const apiData = useContext(ApiDataContext);
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

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
        </>
      ) : (
        <Box>no board.</Box>
      )}
      <Stack direction="row" gap={1} onClick={() => handleRedirect('/board')}>
        <Button variant="contained">back</Button>
      </Stack>
      <Toolbar />
    </Stack>
  );
}

export default BoardDetail;
