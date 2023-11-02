import { ApiDataContext, Board, User } from '@/context/api-data.provider';
import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

function Home() {
  const apiData = useContext(ApiDataContext);

  const [users, setUsers] = useState<User[]>([]);

  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    setUsers(apiData.user);
    setBoards(apiData.board);
  }, [apiData.user, apiData.board]);

  return (
    <Stack>
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(32)}
      >
        Title1
      </Typography>
      <Typography>contents...</Typography>
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(32)}
      >
        Title2
      </Typography>

      {boards.map((board) => (
        <Typography key={board.id}>{board.title}</Typography>
      ))}
    </Stack>
  );
}

export default Home;
