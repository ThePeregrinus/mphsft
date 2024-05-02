import "./App.css"


import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { SignUp } from "./pages/sign-in"
import { useDispatch, useSelector } from "react-redux";
import type{ RootState } from "./store/store";
import { Users } from "./pages/users";
import { logout } from "./store/reducers/auth";
import Bar from "./shared/Bar";
import type { AppDispatch } from "./store/store";
import { UpdateUser } from "./pages/update-user";
import { CreateUser } from "./pages/create-user";

const App = () => {

  return (
    <>
      <CssBaseline />
      <Bar/>
      <div className="App">
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/users" element={<Outlet/>} >
          <Route path="show" element = {<Users/>} />
          <Route path="update" element={<UpdateUser/>} />
          <Route path="create" element={<CreateUser/>}/>
        </Route>
      </Routes>
    </div>
    </>
  )
}

export default App
