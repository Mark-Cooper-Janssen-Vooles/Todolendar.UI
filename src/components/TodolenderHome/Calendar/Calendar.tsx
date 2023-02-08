import React, {useEffect, useState} from 'react'
import '../../../App.css'
import './Calendar.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import dayjs from "dayjs";
import { computeDaysOfMonth } from '../../../helpers/computeDaysOfMonth'
import {dayjsFormat} from "../../../reducers/dateSlice";
import CalendarContainerContent from "./CalendarContainerContent";

const days = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const hours = ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']

const Calendar = () => {
    const [daysOfMonth, setDaysOfMonth] = useState([0, 0, 0, 0, 0, 0, 0]);
    const dispatch = useDispatch()
    const currentTime = useSelector((state: RootState) => state.date.currentTime)
    const dayjsTimeObject = dayjs(currentTime, dayjsFormat)
    const currentDay = days[dayjsTimeObject.day()]

    const [currentHour, setCurrentHour] = useState('')

    useEffect(() => {
        setDaysOfMonth(computeDaysOfMonth(dayjsTimeObject, currentTime))
        setCurrentHour(dayjsTimeObject.format('h A'))

        const calendarContainer = document.getElementsByClassName("CalenderContainerContent")[0]
        calendarContainer.scrollIntoView()

        // below doesn't seem to be working:
        // hmm.scrollTo({
        //     top: 0,
        //     left: 500,
        //     behavior: 'smooth'
        // })
    }, [])

    return (
        <div className="Calendar Border">
            <div className="CalendarContainerHeader">
                {/*(get this from somewhere?)*/}
                <div className="CalendarWeeklyColumnTime">GMT+11</div>
                <div className="CalendarWeeklyColumnDayContainer">
                    {days.map((day, id) => {
                        if (currentDay === day ) {
                            return (
                                <div key={id} className="CalendarWeeklyColumnDay">
                                    <div>{ day }</div>
                                    <div className="CurrentDay">{ daysOfMonth[id] }</div>
                                </div>)
                        }

                        return (
                          <div key={id} className="CalendarWeeklyColumnDay">
                              <div>{ day }</div>
                              <div>{ daysOfMonth[id] }</div>
                          </div>)
                    })}
                </div>
            </div>

            <CalendarContainerContent hours={hours} currentHour={currentHour} />
        </div>
    )
}

export default Calendar