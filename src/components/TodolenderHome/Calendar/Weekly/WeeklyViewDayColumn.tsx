import React from 'react'
import dayjs from "dayjs";
import {dayjsFormat} from "../../../../reducers/dateSlice";
import {IActiveScheduledTodo} from "../ScheduledTodoPortal";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import "./WeeklyViewDayColumn.css";

type IWeeklyColumn = {
    hours: string[];
    currentHour: string;
    daysScheduledTodos: IActiveScheduledTodo[];
    day: string;
}

const WeeklyViewDayColumn = ({hours, currentHour, daysScheduledTodos, day}: IWeeklyColumn) => {
    const currentDay = useSelector((state: RootState) => state.date.currentDay)

    return (
        <div className="CalendarWeeklyColumn">
            {hours.map((hour, id) => {
                // if hour == a scheduledEvent && currentHour == hour, make block highlighted with "CurrentHour" class
                if (currentHour === hour ) {
                    if (currentDay == day.toUpperCase()) {
                        return <div className="CalendarWeeklyColumnTimeContentItemCurrentHourAndDay" id={`${day} - ${hour}`} key={id}>
                            {
                                daysScheduledTodos.map(scheduledTodo => {
                                    const scheduledTodoHour = dayjs(scheduledTodo.ScheduledAt, dayjsFormat).hour()
                                    const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
                                    if (scheduledTodoHourFormatted == hour) {
                                        return <div className="CalendarWeeklyColumnContentItemEvent">{scheduledTodo.Title}</div>
                                    }
                                })
                            }
                        </div>
                    }

                    return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`${day} - ${hour}`} key={id}>
                        {
                            daysScheduledTodos.map(scheduledTodo => {
                                const scheduledTodoHour = dayjs(scheduledTodo.ScheduledAt, dayjsFormat).hour()
                                const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
                                if (scheduledTodoHourFormatted == hour) {
                                    return <div className="CalendarWeeklyColumnContentItemEvent">{scheduledTodo.Title}</div>
                                }
                            })
                        }
                    </div>

                }
                // if hour == a scheduledEvent, generate div for that to put it in.
                return <div className="CalendarWeeklyColumnContentItem" id={`${day} - ${hour}`} key={id}>
                    {
                        daysScheduledTodos.map(scheduledTodo => {
                            const scheduledTodoHour = dayjs(scheduledTodo.ScheduledAt, dayjsFormat).hour()
                            const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
                            if (scheduledTodoHourFormatted == hour) {
                                return <div className="CalendarWeeklyColumnContentItemEvent">{scheduledTodo.Title}</div>
                            }
                        })
                    }
                </div>
            })}
        </div>
    )
}

export default WeeklyViewDayColumn;