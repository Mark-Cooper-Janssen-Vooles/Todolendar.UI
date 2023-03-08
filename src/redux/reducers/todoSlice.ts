import { createSlice } from '@reduxjs/toolkit'

type todoState = {
    todos: {
        id: string;
        title: string;
        description: string;
    }[]
}

const initialState: todoState = {
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
    setTodos
} = todoSlice.actions

export default todoSlice.reducer
