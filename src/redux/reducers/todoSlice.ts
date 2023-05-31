import { createSlice } from '@reduxjs/toolkit'

type todoState = {
    todos: {
        id: string;
        title: string;
        description: string;
        colour: string;
    }[]
}

const initialState: todoState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchTodos: (state) => {}, // picked up in middleware
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        createTodo: (state, action) => {}, // picked up in middleware
        deleteTodo: (state, action) => {}, // picked up in middleware
        saveEditedTodo: (state, action) => {}, // picked up in middleware
    }
})

export const {
    fetchTodos,
    setTodos,
    createTodo,
    deleteTodo,
    saveEditedTodo
} = todoSlice.actions

export default todoSlice.reducer
