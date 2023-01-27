import { configureStore } from '@reduxjs/toolkit'
import dateReducer from './reducers/dateSlice'

const store = configureStore({
    reducer: {
        date: dateReducer
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch