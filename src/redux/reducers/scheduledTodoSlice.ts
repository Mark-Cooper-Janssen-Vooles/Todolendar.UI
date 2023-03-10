import { createSlice } from '@reduxjs/toolkit'
import {IActiveScheduledTodo} from "../../components/TodolendarHome/Calendar/ScheduledTodoPortal";

export type IScheduledTodosDataWeekly = {
    Sun: IActiveScheduledTodo[]
    Mon: IActiveScheduledTodo[]
    Tue: IActiveScheduledTodo[]
    Wed: IActiveScheduledTodo[]
    Thu: IActiveScheduledTodo[]
    Fri: IActiveScheduledTodo[]
    Sat: IActiveScheduledTodo[]
}

type scheduledTodoState = {
    scheduledTodosWeekly: IScheduledTodosDataWeekly
}

const initialState: scheduledTodoState = {
    scheduledTodosWeekly: {
        Sun: [],
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: []
    }
}

export const scheduledTodoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createScheduledTodo: (state, action) => {}, // picked up in middleware
        fetchScheduledTodos: (state) => {}, //picked up in middleware
        setScheduledTodos: (state, action) => {
            //state.scheduledTodosWeekly = action.payload
            // need to set the todos into their days somehow
            state.scheduledTodosWeekly = {
                Sun: [],
                Mon: [],
                Tue: [],
                Wed: [],
                Thu: [],
                Fri: [],
                Sat: []
            }
        }
    }
})

export const {
    createScheduledTodo,
    fetchScheduledTodos,
    setScheduledTodos
} = scheduledTodoSlice.actions

export default scheduledTodoSlice.reducer
