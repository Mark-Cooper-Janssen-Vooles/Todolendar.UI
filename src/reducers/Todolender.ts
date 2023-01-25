import { createSlice } from '@reduxjs/toolkit'
import dayjs from "dayjs";
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const date = dayjs().format('DD-MM-YYYY')

const initialState = {
    currentTime: date,
    viewingTime: date
}

export const todolenderSlice = createSlice({
    name: 'todolender',
    initialState,
    reducers: {
        increaseWeek: (state) => {
            state.viewingTime = dayjs(state.viewingTime, "DD-MM-YYYY").add(7, 'day').format('DD-MM-YYYY')
        },
        decreaseWeek: (state) => {
            state.viewingTime = dayjs(state.viewingTime, "DD-MM-YYYY").subtract(7, 'day').format("DD-MM-YYYY")
        },
        resetToCurrentWeek: (state) => {
            state.viewingTime = date;
        }
    }
})

export const { increaseWeek, decreaseWeek, resetToCurrentWeek } = todolenderSlice.actions

export default todolenderSlice.reducer