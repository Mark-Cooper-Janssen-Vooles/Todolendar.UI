import React, {useEffect, useState} from 'react'
import '../../../App.css'
import './Calendar.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import dayjs from "dayjs";
import { computeDaysOfMonth } from '../../../helpers/computeDaysOfMonth'

const days = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Calendar = () => {
    const [daysOfMonth, setDaysOfMonth] = useState([0, 0, 0, 0, 0, 0, 0]);
    const dispatch = useDispatch()
    const currentTime = useSelector((state: RootState) => state.date.currentTime)
    const dayjsTimeObject = dayjs(currentTime, "DD-MM-YYYY h:m:s")
    const currentDay = days[dayjsTimeObject.day()]

    useEffect(() => {
        setDaysOfMonth(computeDaysOfMonth(dayjsTimeObject, currentTime))
    }, [])

    return (
        // <div className="Calendar Border">
        //     <h1>calendar</h1>
        //     <div>
        //         <p>Day: { dayjsTimeObject.date() } </p>
        //         <p>Month: {dayjsTimeObject.month() + 1 }</p>
        //         <p>year: { dayjsTimeObject.year() } </p>
        //     </div>
        // </div>

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
                    <div className="CalendarWeeklyColumnTimeContentItem">1 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">2 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">3 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">4 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">5 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">6 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">7 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">8 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">9 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">10 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">11 AM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">12 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">1 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">2 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">3 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">4 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">5 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">6 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">7 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">8 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">9 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">10 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">11 PM</div>
                    <div className="CalendarWeeklyColumnTimeContentItem">12 PM</div>
                </div>
                <div className="CalendarWeeklyColumn" id="sun-content">
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                    <div className="CalendarWeeklyColumnTimeContentItem"></div>
                </div>
                <div className="CalendarWeeklyColumn" id="mon-content"></div>
                <div className="CalendarWeeklyColumn" id="tue-content"></div>
                <div className="CalendarWeeklyColumn" id="wed-content"></div>
                <div className="CalendarWeeklyColumn" id="thu-content"></div>
                <div className="CalendarWeeklyColumn" id="fri-content"></div>
                <div className="CalendarWeeklyColumn" id="sat-content"></div>
            </div>
        </div>
    )
}

export default Calendar