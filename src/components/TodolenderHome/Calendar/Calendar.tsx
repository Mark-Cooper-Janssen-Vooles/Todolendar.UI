import React from 'react'
import '../../../App.css'
import './Calendar.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import dayjs from "dayjs";

const Calendar = () => {
    const dispatch = useDispatch()
    const currentTime = useSelector((state: RootState) => state.date.currentTime)

    const dayjsTimeObject = dayjs(currentTime, "DD-MM-YYYY")

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
            <div className="CalendarContainer">
                <div className="CalendarWeeklyColumnTime">Calender times / info</div>
                <div className="CalendarWeeklyColumnDayContainer">
                    <div className="CalendarWeeklyColumnDay">mon</div>
                    <div className="CalendarWeeklyColumnDay">tue</div>
                    <div className="CalendarWeeklyColumnDay">wed</div>
                    <div className="CalendarWeeklyColumnDay">thu</div>
                    <div className="CalendarWeeklyColumnDay">fri</div>
                    <div className="CalendarWeeklyColumnDay">sat</div>
                    <div className="CalendarWeeklyColumnDay">sun</div>
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