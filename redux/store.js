import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './Actions&Reducers/languageSlice'

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
})