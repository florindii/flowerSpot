import {configureStore} from "@reduxjs/toolkit";
import auth from './auth'

export const store = configureStore({
  reducer: {
    auth: auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch