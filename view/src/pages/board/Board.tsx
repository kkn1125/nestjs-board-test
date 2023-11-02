import { ApiDataContext, Board } from '@/context/api-data.provider';
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
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Board() {
  const [boards, setBoards] = useState<Board[]>([]);
  const apiData = useContext(ApiDataContext);
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setBoards(apiData.board);
  }, [apiData]);

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <Box>
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(32)}
      >
        Title1
      </Typography>
      {auth.user && (
        <Button onClick={() => handleRedirect('write')}>write</Button>
      )}
      <List>
        {boards.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => handleRedirect('/board/' + item.id)}
            >
              <ListItemText primary={item.title.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
        {boards.length === 0 && (
          <ListItem>
            <ListItemText>no items</ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );
}

export default Board;
