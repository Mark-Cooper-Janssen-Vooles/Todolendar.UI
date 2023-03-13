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

export type IDateRangeWeekly = {
    startDate: string;
    endDate: string;
    currentDayString: string,
    daysOfMonth: string[]
}

type scheduledTodoState = {
    scheduledTodosWeekly: IScheduledTodosDataWeekly,
    dateRangeWeekly: IDateRangeWeekly
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
    },
    dateRangeWeekly: {
        startDate: '',
        endDate: '',
        currentDayString: '',
        daysOfMonth: []
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
            state.scheduledTodosWeekly = action.payload
        },
        dateRangeWeekly: (state, action) => {
            // convert local times to UTC:

            state.dateRangeWeekly = action.payload
        }
    }
})

export const {
    createScheduledTodo,
    fetchScheduledTodos,
    setScheduledTodos,
    dateRangeWeekly
} = scheduledTodoSlice.actions

export default scheduledTodoSlice.reducer
