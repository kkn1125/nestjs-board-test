import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

function SignLayout() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flex: 1,
      }}
    >
      <Outlet />
    </Container>
  );
}

export default SignLayout;
