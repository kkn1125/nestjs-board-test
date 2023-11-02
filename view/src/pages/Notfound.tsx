import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Notfound() {
  const navigate = useNavigate();
  const handleRedirect = (path: string) => navigate(path);

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ height: '100%' }}
    >
      <Typography
        fontWeight={700}
        fontSize={(theme) => theme.typography.pxToRem(48)}
      >
        Not Found
      </Typography>
      <Typography
        fontWeight={500}
        fontSize={(theme) => theme.typography.pxToRem(32)}
        gutterBottom
      >
        404
      </Typography>
      <Typography>페이지를 찾을 수 없습니다. 🤔</Typography>
      <Stack direction="row" gap={1} sx={{ mt: 5 }}>
        <Button
          variant="outlined"
          color="info"
          onClick={() => handleRedirect('/')}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => handleRedirect('-1')}
        >
          Prev Page
        </Button>
      </Stack>
    </Stack>
  );
}

export default Notfound;
