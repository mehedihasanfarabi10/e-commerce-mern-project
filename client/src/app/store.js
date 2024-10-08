import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './feautures/counter/counterSlice'

export const store = configureStore({
  reducer: {
        //counterR => counterReducer
        counterR: counterSlice
  },
})