import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:'en',
}

export const languageSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    english: (state) => {
      state.value = 'en'
    },
    urdu: (state) => {
      state.value = 'ur'
    },
  },
})

export const { english, urdu } = languageSlice.actions

export default languageSlice.reducer