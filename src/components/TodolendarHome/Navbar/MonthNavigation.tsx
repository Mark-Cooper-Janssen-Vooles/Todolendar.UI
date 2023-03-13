import React, {useEffect} from 'react'
import './MonthlyNavigation.css'
import {increaseWeek, decreaseWeek, resetToCurrentWeek, dayjsFormat} from '../../../redux/reducers/dateSlice'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from "dayjs";
import { RootState } from "../../../redux/store";
import {dateRangeWeekly, fetchScheduledTodos} from "../../../redux/reducers/scheduledTodoSlice";
import {dateRangeWeeklyObject} from "../../../helpers/fetchScheduledTodosHelper";
// var customParseFormat = require('dayjs/plugin/customParseFormat')
// dayjs.extend(customParseFormat)

const months =  [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
]

const MonthNavigation = () => {
    const dispatch = useDispatch()
    const viewingTime = useSelector((state: RootState) => state.date.viewingTime)

    useEffect(() => {
        console.log(viewingTime)
        // need to dispatch dateRangeWeekly
        // need to dispatch fetchScheduledTodos
        dispatch(dateRangeWeekly(dateRangeWeeklyObject(viewingTime)))
        dispatch(fetchScheduledTodos())
    }, [viewingTime])

    const handleTodayOnClick = () => {
        dispatch(resetToCurrentWeek())
    }

    const handleBackWeek = () => {
        dispatch(decreaseWeek())
    }

    const handleForwardWeek = () => {
        dispatch(increaseWeek())
    }

    return (
        <div className="MonthlyNavigation">
            <button className="ButtonSmall" onClick={handleTodayOnClick}>Today</button>
            <div className="HandOnHover" onClick={handleBackWeek}>{'<'} &nbsp; </div>
            <div className="HandOnHover" onClick={handleForwardWeek}>{'>'} &nbsp;</div>

            <div>
                { months[dayjs(viewingTime, dayjsFormat).month()] } &nbsp;
                { dayjs(viewingTime, dayjsFormat).year() }
            </div>
        </div>
    )
}

export default MonthNavigation
