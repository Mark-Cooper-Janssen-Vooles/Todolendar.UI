import React from 'react'
import '../../../App.css'
import './Calendar.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import dayjs from "dayjs";

const days = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Calendar = () => {
    const dispatch = useDispatch()
    const currentTime = useSelector((state: RootState) => state.date.currentTime)
    const dayjsTimeObject = dayjs(currentTime, "DD-MM-YYYY h:m:s")
    const currentDay = days[dayjsTimeObject.day()]

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
                            console.log(currentDay)

                            return (
                                <div key={id} className="CalendarWeeklyColumnDay">
                                    <div>{ day }</div>
                                    <div className="CurrentDay">{ dayjsTimeObject.date() }</div>
                                </div>
                            )
                        }

                          return (
                              <div key={id} className="CalendarWeeklyColumnDay">
                                  <div>{ day }</div>
                                  <div>{ dayjsTimeObject.date() }</div>
                              </div>
                          )
                    })}
                    {/*<div className="CalendarWeeklyColumnDay">*/}
                    {/*    <div>MON</div>*/}
                    {/*    <div>{ dayjsTimeObject.date() }</div>*/}
                    {/*</div>*/}
                    {/*<div className="CalendarWeeklyColumnDay">TUE</div>*/}
                    {/*<div className="CalendarWeeklyColumnDay">WED</div>*/}
                    {/*<div className="CalendarWeeklyColumnDay">THU</div>*/}
                    {/*<div className="CalendarWeeklyColumnDay">FRI</div>*/}
                    {/*<div className="CalendarWeeklyColumnDay">SAT</div>*/}
                    {/*<div className="CalendarWeeklyColumnDay">SUN</div>*/}
                </div>
            </div>

            {/*<div>Time Column</div>*/}
            {/*<div className="CalendarWeeklyColumn">*/}
            {/*    <div className="CalendarWeeklyColumnDay">mon</div>*/}
            {/*    <div></div>*/}
            {/*</div>*/}
            {/*<div className="CalendarWeeklyColumn">tue</div>*/}
            {/*<div className="CalendarWeeklyColumn">wed</div>*/}
            {/*<div className="CalendarWeeklyColumn">thu</div>*/}
            {/*<div className="CalendarWeeklyColumn">fri</div>*/}
            {/*<div className="CalendarWeeklyColumn">sat</div>*/}
            {/*<div className="CalendarWeeklyColumn">sun</div>*/}
        </div>
    )
}

export default Calendar