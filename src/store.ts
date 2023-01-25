// import {createStore, applyMiddleware, combineReducers} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import thunk from 'redux-thunk';
// import todoReducer from './reducers/todo'
// import messageReducer from './reducers/messages'
//
// const reducer = combineReducers({
//     todo: todoReducer,
//     message: messageReducer
// });
//
// export default createStore(
//     reducer,
//     composeWithDevTools(
//         applyMiddleware(thunk)
//     )
// );
//

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