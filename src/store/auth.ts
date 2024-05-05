import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'; // Import Dispatch type from redux
import axios from "axios";
import {IUser} from "../interfaces/User";
import {CreateUser} from "../interfaces/CreateUser";

export interface loginState {
  isLogin: boolean,
  user: IUser | null
}

const initialState: loginState = {
  isLogin: false,
  user: null
}

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
      if (action.payload == null)
        state.isLogin = false
      else
        state.isLogin = true
    },
    createUser: (state, action: PayloadAction<CreateUser | null>) => {

    }, 
    logoutUser: (state) => {
        state.user = null;
        state.isLogin = false;
    },
  }
})

export const { loginUser,logoutUser  } = login.actions

export default login.reducer