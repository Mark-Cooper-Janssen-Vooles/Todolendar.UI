import { createSlice } from '@reduxjs/toolkit'

type scheduledTodoState = {
    scheduledTodos: {
        id: string;
        title: string;
        description: string;
    }[]
}

const initialState: scheduledTodoState = {
    scheduledTodos: []
}

export const scheduledTodoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createScheduledTodo: (state, action) => {}, // picked up in middleware
        fetchScheduledTodos: (state) => {}, //picked up in middleware
        setScheduledTodos: (state, action) => {
            state.scheduledTodos = action.payload
        }
    }
})

export const {
    createScheduledTodo,
    fetchScheduledTodos,
    setScheduledTodos
} = scheduledTodoSlice.actions

export default scheduledTodoSlice.reducer
