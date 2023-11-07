import { ApiDataContext, Board, User } from '@/context/api-data.provider';
import { AuthContext } from '@/context/auth.provider';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

function Board() {
  const [users, setUsers] = useState<User[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const apiData = useContext(ApiDataContext);
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setBoards(apiData.board);
  }, [apiData]);

  useEffect(() => {
    setUsers(apiData.user);
    setBoards(apiData.board);
  }, [apiData.user, apiData.board]);

  const boardAuthor = useMemo(
    () =>
      boards.length === 0 ? (
        <ListItem>
          <ListItemText>no items</ListItemText>
        </ListItem>
      ) : (
        boards.map((item) => {
          const author = users.find((user) => user.id === item.author);
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => handleRedirect('/board/' + item.id)}
              >
                <ListItemText
                  primary={item.title.toUpperCase()}
                  secondary={author?.username}
                />
              </ListItemButton>
            </ListItem>
          );
        })
      ),
    [users, boards],
  );

  const handleRedirect = (path: string, options?: NavigateOptions) => {
    navigate(path, options);
  };

  return (
    <Box>
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(32)}
      >
        Lorem ipsum dolor sit amet.
      </Typography>
      {auth.user && (
        <Button
          onClick={() =>
            handleRedirect('write', { state: { referer: '/board' } })
          }
        >
          write
        </Button>
      )}
      <List>{boardAuthor}</List>
    </Box>
  );
}

export default Board;
