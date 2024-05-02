import './App.css';

import { Outlet, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { SignUp } from './pages/sign-in';
import { Users } from './pages/users';
import Bar from './shared/Bar';
import { UpdateUser } from './pages/update-user';
import { CreateUser } from './pages/create-user';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Bar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<SignUp />} />
          <Route path='/users' element={<Outlet />}>
            <Route path='show' element={<Users />} />
            <Route path='update' element={<UpdateUser />} />
            <Route path='create' element={<CreateUser />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
