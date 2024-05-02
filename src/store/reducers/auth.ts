import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface IinitialState{
    token: undefined | null | string,
    isLoading: boolean
}

export interface IUserLogin{
    username:string,
    password:string
}

export interface IUserCreate{
    "username": string,
    "first_name":string,
    "last_name": string,
    "password": string,
    "is_active": boolean
}

export interface IUserReplace{
  "id" : number,
  "username": string,
  "first_name":string,
  "last_name": string,
  "password": string,
  "is_active": boolean
}

const initialState:IinitialState = {
    token: undefined,
    isLoading: false,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
          })
          .addCase(login.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(getUsers.pending, (state)=>{
            state.isLoading = true
          }) .addCase(getUsers.fulfilled, (state)=>{
            state.isLoading = false
          })          .addCase(getUsers.rejected, (state) => {
            state.isLoading = false
          })
          .addCase(createUser.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(createUser.fulfilled, (state)=>{
            state.isLoading =  false
          })
          .addCase(createUser.rejected, (state)=>{
            state.isLoading = false
          })
          .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.token = null;
          })

    }
})

export const login = createAsyncThunk('auth/login', async (userData:IUserLogin, thunkAPI)=>{
    try {
        const response = await axios.post('https://test-assignment.emphasoft.com/api/v1/login/', userData)
        return response.data

        }
     catch(err:any){
        return thunkAPI.rejectWithValue(err.response.data.errors)
    }
})

export const logout = createAsyncThunk('auth/logout', async ()=>{
        localStorage.removeItem("accessToken");

})

export const getUsers = createAsyncThunk('auth/getUsers', async ()=>{
        const token = localStorage.getItem("accessToken") ?? "";
        const response = await axios.get("https://test-assignment.emphasoft.com/api/v1/users/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        return response;
})

export const createUser = createAsyncThunk('auth/createUser', async (userData :IUserCreate, thunkAPI)=>{
  const token = localStorage.getItem("accessToken") ?? "";
  const response = await axios({
    method: 'post',
    url:"https://test-assignment.emphasoft.com/api/v1/users/",
  headers: {
    Authorization: `Token ${token}`,
  },
  data:{...userData}
})

  return response;
})

export const updateUser = createAsyncThunk('auth/updateUser', async (userData:IUserReplace, thunkAPI)=>{
  const token = localStorage.getItem("accessToken") ?? "";
  const response = await axios({
    method: 'put',
    url:`https://test-assignment.emphasoft.com/api/v1/users/${userData.id}`,
  headers: {
    Authorization: `Token ${token}`,
  },
  data:{username: userData.username, first_name: userData.first_name, last_name: userData.last_name, is_active: userData.is_active, password: userData.password }
})
return response;
})
export default authSlice.reducer