import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchTodos: (state) => { //picked up in middleware
            console.log('fetch todos reducer')
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        }
    }
})

export const {
    fetchTodos,
} = todoSlice.actions

export default todoSlice.reducer
