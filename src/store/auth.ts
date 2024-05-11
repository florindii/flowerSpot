import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'; // Import Dispatch type from redux
import axios from "axios";
import {IUser} from "../interfaces/User";
import {CreateUser} from "../interfaces/CreateUser";
import { Auth_Token } from "../interfaces/Token";

export interface loginState {
  isLogin: boolean,
  user: IUser | null,
  token : string,
}

const initialState: loginState = {
  isLogin: false,
  user: null,
  token: '',
}

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<Auth_Token | null>) => {      
      if (action.payload == null){
        state.isLogin = false

      } else{
        const data = action.payload.auth_token;
        localStorage.setItem('token', action.payload?.auth_token)
        state.token = action.payload?.auth_token;
        state.isLogin = true
      }
    },
    registerUser: (state, action: PayloadAction<CreateUser | null>) => {
      if(action.payload?.createUser){
        return
      }
    }, 
    logoutUser: (state) => {
        state.user = null;
        state.isLogin = false;
        localStorage.removeItem('token');
    },
    setToken:(state, action: PayloadAction<any>) => {      
      state.isLogin = action.payload
    }
  }
})

export const { loginUser,logoutUser, registerUser, setToken  } = login.actions

export default login.reducer