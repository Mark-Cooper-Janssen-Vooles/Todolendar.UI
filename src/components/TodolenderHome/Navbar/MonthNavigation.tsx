import React from 'react'
import './MonthlyNavigation.css'
import { increaseWeek, decreaseWeek, resetToCurrentWeek } from '../../../reducers/Todolender'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from "dayjs";
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const months =  [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
]

const MonthNavigation = () => {
    const dispatch = useDispatch()
    // @ts-ignore
    const currentTime = useSelector((state) => state.todolender.currentTime)
    // @ts-ignore
    const viewingTime = useSelector((state) => state.todolender.viewingTime)

    const handleTodayOnClick = () => {
        dispatch(resetToCurrentWeek())
    }

    return (
        <div className="MonthlyNavigation">
            <button className="ButtonSmall" onClick={handleTodayOnClick}>Today</button>
            <div onClick={() => dispatch(decreaseWeek())}>{'<'}</div>
            <div onClick={() => dispatch(increaseWeek())}>{'>'}</div>

            <div>
                { months[dayjs(viewingTime, "DD-MM-YYYY").month()] }
                { dayjs(viewingTime, "DD-MM-YYYY").year() }
            </div>
        </div>
    )
}

export default MonthNavigation