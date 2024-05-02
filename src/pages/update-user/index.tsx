import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { updateUser } from '../../store/reducers/auth';

export const UpdateUser = () => {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [is_active, setChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      updateUser({ id, username, first_name, last_name, password, is_active }),
    ).then((action) => {});
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Update user form
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => {
              setId(Number(e.target.value));
            }}
            type='number'
            margin='normal'
            required
            fullWidth
            id='id'
            label="Choose user's id we want update to"
            name='id'
            autoFocus
          />
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            margin='normal'
            required
            fullWidth
            id='username'
            label='User name'
            name='username'
            autoFocus
          />
          <TextField
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            margin='normal'
            required
            fullWidth
            id='firstname'
            label='First name'
            name='firstname'
          />
          <TextField
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            margin='normal'
            required
            fullWidth
            id='lastname'
            label='Last name'
            name='lastname'
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            onClick={() => setChecked(!is_active)}
            control={<Checkbox value='isactive' color='primary' />}
            label='Is active'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Save data
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
