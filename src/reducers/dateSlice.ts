import { createSlice } from '@reduxjs/toolkit'
import dayjs from "dayjs";
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const date = dayjs().format('DD-MM-YYYY h:m:s')

type dateSliceState = {
    currentTime: string;
    viewingTime: string;
}

const initialState: dateSliceState = {
    currentTime: date,
    viewingTime: date
}

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        increaseWeek: (state) => {
            state.viewingTime = dayjs(state.viewingTime, "DD-MM-YYYY h:m:s").add(7, 'day').format('DD-MM-YYYY h:m:s')
        },
        decreaseWeek: (state) => {
            state.viewingTime = dayjs(state.viewingTime, "DD-MM-YYYY h:m:s").subtract(7, 'day').format("DD-MM-YYYY h:m:s")
        },
        resetToCurrentWeek: (state) => {
            state.viewingTime = date;
        }
    }
})

export const { increaseWeek, decreaseWeek, resetToCurrentWeek } = dateSlice.actions

export default dateSlice.reducer