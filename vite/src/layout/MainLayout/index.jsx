import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { CssBaseline, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { SET_MENU } from 'store/actions';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
       
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
    
      </AppBar>
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
    </Box>
  );
};

export default MainLayout;
