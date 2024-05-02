import { Grid } from '@mui/material';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { getUsers } from '../../store/reducers/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../store/store';
import { useState } from 'react';
import { retry } from '@reduxjs/toolkit/query';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 5,
        m: 1,
        border: '1px solid',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        width: '400px',
        ...sx,
      }}
      {...other}
    />
  );
}
export const Users = () => {
  const auth = useSelector((state: RootState) => state.authReducer.token);
  const dispatch = useDispatch<AppDispatch>();

  interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  }
  const [users, setUsers] = useState<Array<IUser>>([]);
  useEffect(() => {
    dispatch(getUsers()).then((action) => {
      setUsers(action.payload.data);
    });
  }, []);

  if (!auth && !localStorage.getItem('accessToken')) {
    return <Navigate to='/login' />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        maxWidth: 1000,
        borderRadius: 1,
      }}
    >
      {users?.map((e) => {
        return (
          <Item key={e.id}>
            <Box>username: {e.username}</Box>
            <Box>id: {e.id}</Box>
            <Box>first_name: {e.first_name}</Box>
            <Box>last_name: {e.last_name}</Box>
          </Item>
        );
      })}
    </Box>
  );
};
