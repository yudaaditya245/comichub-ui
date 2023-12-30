import { configureStore } from '@reduxjs/toolkit'
import chapdiag from './features/chapdiag'

export const store = configureStore({
  reducer: {
    chapdiag
  },
})