import React from 'react'
import './MonthlyNavigation.css'
import {increaseWeek, decreaseWeek, resetToCurrentWeek, dayjsFormat} from '../../../redux/reducers/dateSlice'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from "dayjs";
import { RootState } from "../../../redux/store";
// var customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

const months =  [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
]

const MonthNavigation = () => {
    const dispatch = useDispatch()
    const viewingTime = useSelector((state: RootState) => state.date.viewingTime)

    const handleTodayOnClick = () => {
        dispatch(resetToCurrentWeek())
    }

    return (
        <div className="MonthlyNavigation">
            <button className="ButtonSmall" onClick={handleTodayOnClick}>Today</button>
            <div className="HandOnHover" onClick={() => dispatch(decreaseWeek())}>{'<'} &nbsp; </div>
            <div className="HandOnHover" onClick={() => dispatch(increaseWeek())}>{'>'} &nbsp;</div>

            <div>
                { months[dayjs(viewingTime, dayjsFormat).month()] } &nbsp;
                { dayjs(viewingTime, dayjsFormat).year() }
            </div>
        </div>
    )
}

export default MonthNavigation
