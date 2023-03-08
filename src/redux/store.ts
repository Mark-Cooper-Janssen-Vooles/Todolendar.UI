import { configureStore } from '@reduxjs/toolkit'
import dateReducer from './reducers/dateSlice'
import userReducer from './reducers/userSlice'
import todoReducer from './reducers/todoSlice'
import { listenerMiddleware } from "./listenerMiddleware";

const store = configureStore({
    reducer: {
        date: dateReducer,
        user: userReducer,
        todo: todoReducer,
    },
    // Add the listener middleware to the store.
    // NOTE: Since this can receive actions with functions inside,
    // it should go before the serializability check middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
