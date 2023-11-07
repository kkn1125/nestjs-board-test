import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from 'react';
import { apiAxios } from '@/util/instances';
import {
  API_DATA_ACTION,
  ApiDataContext,
  ApiDataDispatchContext,
  User,
} from '@/context/api-data.provider';
import { useNavigate } from 'react-router-dom';
import {
  AUTH_DATA_ACTION,
  AuthContext,
  AuthDispatchContext,
} from '@/context/auth.provider';
import * as jose from 'jose';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const BRAND_NAME = 'devkimson';

const drawerWidth = 240;

// type ParseUser = {
//   id: number;
//   email: string;
// };

export default function Gnb(props: Props) {
  const initialMenu = [
    { path: '/', name: 'home' },
    { path: '/board', name: 'board' },
    { path: '/about', name: 'about' },
    { path: '/contact', name: 'contact' },
  ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const apiData = useContext(ApiDataContext);
  const apiDataDispatch = useContext(ApiDataDispatchContext);
  const auth = useContext(AuthContext);
  const authDispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState(initialMenu);

  useEffect(() => {
    (async () => {
      const { data: userData } = await apiAxios.get('/user');
      const { data: boardData } = await apiAxios.get('/board');
      apiDataDispatch({
        type: API_DATA_ACTION.LOAD_USER,
        user: userData.data,
      });
      apiDataDispatch({
        type: API_DATA_ACTION.LOAD_BOARD,
        board: boardData.data,
      });
      authDispatch({
        type: AUTH_DATA_ACTION.LOAD,
      });
    })();
  }, [auth.version, apiData.version]);

  useEffect(() => {
    if (auth.auth.token) {
      const users = jose.decodeJwt(auth.auth.token);
      const foundUser = apiData.user.find((user) => user.email === users.email);
      authDispatch({
        type: AUTH_DATA_ACTION.SAVE_USER,
        user: foundUser,
      });
    }
  }, [auth.auth.token]);

  useEffect(() => {
    if (!auth.auth.token) {
      setNavItems(() => {
        initialMenu.push({
          path: '/auth/signin',
          name: 'sign in',
        });

        return initialMenu;
      });
    } else {
      const authUser = auth.user;
      if (authUser) {
        setNavItems(() => {
          initialMenu.push({
            path: '/auth/profile',
            name: `profile (${authUser.email})`,
          });
          return initialMenu;
        });
      }
    }
  }, [auth.user]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {BRAND_NAME.toUpperCase()}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {BRAND_NAME.toUpperCase()}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                variant="text"
                onClick={() => handleRedirect(item.path)}
              >
                {item.name.toUpperCase()}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
