import { createSlice } from '@reduxjs/toolkit'
import dayjs from "dayjs";
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const dayjsFormat = 'DD-MM-YYYY h:m:s a';

const date = dayjs().format(dayjsFormat)

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
            state.viewingTime = dayjs(state.viewingTime, dayjsFormat).add(7, 'day').format(dayjsFormat)
        },
        decreaseWeek: (state) => {
            state.viewingTime = dayjs(state.viewingTime, dayjsFormat).subtract(7, 'day').format(dayjsFormat)
        },
        resetToCurrentWeek: (state) => {
            state.viewingTime = date;
        }
    }
})

export const { increaseWeek, decreaseWeek, resetToCurrentWeek } = dateSlice.actions

export default dateSlice.reducer