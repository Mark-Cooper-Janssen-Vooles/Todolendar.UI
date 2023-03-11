import React, {useEffect} from 'react'
import dayjs from "dayjs";
import {dayjsFormat} from "../../../../redux/reducers/dateSlice";
import {IActiveScheduledTodo} from "../ScheduledTodoPortal";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import "./WeeklyViewDayColumn.css";
const utc = require('dayjs/plugin/utc')

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

    useEffect(() => {
        // reload component whenever scheduledTodos in the redux state changes
    }, [scheduledTodosRedux])

    const scheduledTodoElement = (scheduledTodo: IActiveScheduledTodo, hour: string) => {
        // console.log(scheduledTodo.scheduledAt)
        // // console.log("dayjs", dayjs().subtract(0, 'hour').format(dayjsFormat))
        //
        // dayjs.extend(utc)
        // console.log("dayjs", dayjs(scheduledTodo.scheduledAt).hour())
        // need to convert above: "2023-03-06T04:02:00" into dayjs object below...

        // const scheduledTodoHour = dayjs(scheduledTodo.scheduledAt, dayjsFormat).hour()

        const scheduledTodoHour = dayjs(scheduledTodo.scheduledAt).hour()

        const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
        console.log(scheduledTodoHourFormatted)
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
