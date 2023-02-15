import React from 'react'
import dayjs from "dayjs";
import {dayjsFormat} from "../../../../reducers/dateSlice";
import {IActiveScheduledTodo} from "../ScheduledTodoPortal";

type IWednesdayWeeklyColumn = {
    hours: string[];
    currentHour: string;
    wedScheduledTodos: IActiveScheduledTodo[]
}

const WednesdayWeeklyColumn = ({hours, currentHour, wedScheduledTodos}: IWednesdayWeeklyColumn) => {
    return (
        <div className="CalendarWeeklyColumn" id="wed-content">
            {hours.map((hour, id) => {
                // if hour == a scheduledEvent from wed && currentHour == hour, make block highlighted with "CurrentHour" class
                if (currentHour === hour ) {
                    return <div className="CalendarWeeklyColumnTimeContentItemCurrentHour" id={`tue-${hour}`} key={id}>
                        {
                            wedScheduledTodos.map(scheduledTodo => {
                                const scheduledTodoHour = dayjs(scheduledTodo.ScheduledAt, dayjsFormat).hour()
                                const scheduledTodoHourFormatted = hours[scheduledTodoHour - 1]
                                if (scheduledTodoHourFormatted == hour) {
                                    return <div className="CalendarWeeklyColumnContentItemEvent">{scheduledTodo.Title}</div>
                                }
                            })
                        }
                    </div>
                }
                // if hour == a scheduledEvent from wed, generate div for that to put it in.
                return <div className="CalendarWeeklyColumnContentItem" id={`tue-${hour}`} key={id}>
                    {
                        wedScheduledTodos.map(scheduledTodo => {
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

export default WednesdayWeeklyColumn