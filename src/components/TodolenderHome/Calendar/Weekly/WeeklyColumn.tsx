import React from 'react'
import dayjs from "dayjs";
import {dayjsFormat} from "../../../../reducers/dateSlice";
import {IActiveScheduledTodo} from "../ScheduledTodoPortal";

type IWeeklyColumn = {
    hours: string[];
    currentHour: string;
    daysScheduledTodos: IActiveScheduledTodo[]
}

const WeeklyColumn = ({hours, currentHour, daysScheduledTodos}: IWeeklyColumn) => {
    return (
        <div className="CalendarWeeklyColumn">
            {hours.map((hour, id) => {
                // if hour == a scheduledEvent && currentHour == hour, make block highlighted with "CurrentHour" class
                if (currentHour === hour ) {
                    return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`tue-${hour}`} key={id}>
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
                return <div className="CalendarWeeklyColumnContentItem" id={`tue-${hour}`} key={id}>
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

export default WeeklyColumn