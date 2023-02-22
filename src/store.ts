import { configureStore } from '@reduxjs/toolkit'
import dateReducer from './reducers/dateSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
    reducer: {
        date: dateReducer,
        user: userReducer
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch