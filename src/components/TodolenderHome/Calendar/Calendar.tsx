import React, {useEffect, useState} from 'react'
import '../../../App.css'
import './Calendar.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import dayjs from "dayjs";
import { computeDaysOfMonth } from '../../../helpers/computeDaysOfMonth'
import {dayjsFormat} from "../../../reducers/dateSlice";

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
                        if (currentDay == day ) {
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

            <div className="CalenderContainerContent">
                <div className="CalendarWeeklyColumnTimeContent">
                    {hours.map((hour, id) => {
                        if (currentHour == hour ) {
                            return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" key={id}>{hour}</div>
                        }
                        return <div className="CalendarWeeklyColumnTimeContentItem" key={id}>{hour}</div>
                    })}
                </div>

                <div className="CalendarWeeklyColumn" id="sun-content">
                    <div className="CalendarWeeklyColumnContentItem" id="sun-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sun-11pm"></div>
                </div>

                <div className="CalendarWeeklyColumn" id="mon-content">
                    <div className="CalendarWeeklyColumnContentItem" id="mon-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="mon-11pm"></div>
                </div>

                <div className="CalendarWeeklyColumn" id="tue-content">
                    <div className="CalendarWeeklyColumnContentItem" id="tue-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="tue-11pm"></div>
                </div>
                <div className="CalendarWeeklyColumn" id="wed-content">
                    <div className="CalendarWeeklyColumnContentItem" id="wed-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="wed-11pm"></div>
                </div>
                <div className="CalendarWeeklyColumn" id="thu-content">
                    <div className="CalendarWeeklyColumnContentItem" id="thu-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="thu-11pm"></div>
                </div>
                <div className="CalendarWeeklyColumn" id="fri-content">
                    <div className="CalendarWeeklyColumnContentItem" id="fri-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="fri-11pm"></div>
                </div>
                <div className="CalendarWeeklyColumn" id="sat-content">
                    <div className="CalendarWeeklyColumnContentItem" id="sat-1am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-2am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-3am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-4am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-5am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-6am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-7am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-8am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-9am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-10am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-11am"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-12pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-1pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-2pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-3pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-4pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-5pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-6pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-7pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-8pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-9pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-10pm"></div>
                    <div className="CalendarWeeklyColumnContentItem" id="sat-11pm"></div>
                </div>
            </div>
        </div>
    )
}

export default Calendar