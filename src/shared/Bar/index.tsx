import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/auth';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch } from 'react-redux';

export default function Bar() {
  const auth = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logoutOnClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {(auth || localStorage.getItem('accessToken')) && (
            <>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                <Link to='/users/show'>Show users </Link>
                <Link to='/users/create'>Create users </Link>
                <Link to='/users/update'>Update users </Link>
              </Typography>
              <Button color='inherit' onClick={logoutOnClick}>
                <Link to='/login'>Logout</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
