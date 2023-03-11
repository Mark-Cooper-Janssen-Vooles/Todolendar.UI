import React, {useEffect} from 'react'
import dayjs from "dayjs";
import {dayjsFormat} from "../../../../redux/reducers/dateSlice";
import {IActiveScheduledTodo} from "../ScheduledTodoPortal";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import "./WeeklyViewDayColumn.css";
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')


type IWeeklyColumn = {
    hours: string[];
    currentHour: string;
    daysTodos: IActiveScheduledTodo[];
    day: string;
    handleScheduledTodoOpen: (scheduledTodo: IActiveScheduledTodo) => void;
}

const WeeklyViewDayColumn = ({hours, currentHour, daysTodos, day, handleScheduledTodoOpen}: IWeeklyColumn) => {
    const currentDay = useSelector((state: RootState) => state.date.currentDay)
    const scheduledTodosRedux = useSelector((state: RootState) => state.scheduledTodo.scheduledTodosWeekly)
    dayjs.extend(utc)
    dayjs.extend(timezone)

    useEffect(() => {
        // reload component whenever scheduledTodos in the redux state changes
    }, [scheduledTodosRedux])

    const scheduledTodoElement = (scheduledTodo: IActiveScheduledTodo, hour: string) => {
        // @ts-ignore*/
        const timezone = dayjs.tz.guess()
        // @ts-ignore*/ => converts ISO string in DB (GMT format) to current timezone
        const scheduledTodoHour = dayjs(scheduledTodo.scheduledAt).utc('z').local().tz(timezone).hour()
        const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]

        if (scheduledTodoHourFormatted === hour) {
            return <div
                className="CalendarWeeklyColumnContentItemEvent"
                onClick={() => handleScheduledTodoOpen(scheduledTodo)}
                key={scheduledTodo.id}
            >{scheduledTodo.title}</div>
        }
    }

    return (
        <div className="CalendarWeeklyColumn">
            {hours.map((hour, id) => {
                // if hour == a scheduledEvent && currentHour == hour, make block highlighted with "CurrentHour" class
                if (currentHour === hour ) {
                    if (currentDay === day.toUpperCase()) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHourAndDay" id={`${day} - ${hour}`} key={id}>
                            { daysTodos.map(scheduledTodo => scheduledTodoElement(scheduledTodo, hour)) }
                        </div>
                    }

                    return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`${day} - ${hour}`} key={id}>
                        {daysTodos.map(scheduledTodo => scheduledTodoElement(scheduledTodo, hour))}
                    </div>

                }
                // if hour == a scheduledEvent, generate div for that to put it in.
                return <div className="CalendarWeeklyColumnContentItem" id={`${day} - ${hour}`} key={id}>
                    {daysTodos.map(scheduledTodo => scheduledTodoElement(scheduledTodo, hour))}
                </div>
            })}
        </div>
    )
}

export default WeeklyViewDayColumn;
