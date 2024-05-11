import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux'; // Import Dispatch type from redux
import axios from "axios";
import {IUser} from "../interfaces/User";
import {CreateUser} from "../interfaces/CreateUser";
import { Auth_Token } from "../interfaces/Token";
import { IUserProfile } from "../interfaces/GetUserProfile";

export interface profileState {
  userProfile : IUserProfile | null
}

const initialState: profileState = {
userProfile: null
}

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
   
    setUser: (state, action: PayloadAction<IUserProfile | null>) => {      
      state.userProfile = action.payload;
    }
  }
})

export const { setUser  } = profile.actions

export default profile.reducer