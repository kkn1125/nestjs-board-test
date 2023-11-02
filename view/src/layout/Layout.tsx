import { Container, Stack, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Gnb from '../components/common/Gnb';

function Layout() {
  return (
    <Stack sx={{ height: 'inherit', overeflow: 'auto' }}>
      <Gnb />
      <Toolbar />
      <Stack
        flex={1}
        sx={{
          overflowY: 'auto',
          wordWrap: 'break-word',
        }}
      >
        <Container maxWidth="md" sx={{ flex: 1 }}>
          <Outlet />
        </Container>
      </Stack>
      <Footer />
    </Stack>
  );
}

export default Layout;
