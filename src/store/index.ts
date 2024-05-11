import {configureStore} from "@reduxjs/toolkit";
import auth from './auth'
import  profile  from "./profile";
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
    auth: auth,
    profile : profile,
    loadingReducer:loadingReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch